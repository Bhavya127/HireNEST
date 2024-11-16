import '../Components/#chat.css';
import React, { useEffect, useRef } from 'react';
import {createInstance} from 'agora-rtm-react';


const VideoChat = () => {
    let APP_ID = '01f177fbea5844cc9aa9a8539b454ba5';
    let token = null;
    let uid = String(Math.floor(Math.random() * 10000));

    const clientRef = useRef(null);
    const channelRef = useRef(null);

    let localStream;
    let remoteStream;
    let peerConnection;

    const servers = {
        iceServers: [
            { urls: ['stun:stun.l.google.com:19302', 'stun:stun2.l.google.com:19302'] }
        ]
    }

    let loginCooldown = false;

    const init = async () => {
        if (loginCooldown) return;

        loginCooldown = true;
        setTimeout(() => { loginCooldown = false; }, 3000);  // 3 seconds cooldown

        clientRef.current = await createInstance(APP_ID);
        await clientRef.current.login({ uid, token });

        channelRef.current = clientRef.current.createChannel('main');
        await channelRef.current.join();

        channelRef.current.on('MemberJoined', handleUserJoined);
        clientRef.current.on("MessageFromPeer", handleMessageFromPeer);

        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        document.getElementById('user-1').srcObject = localStream;

        clientRef.current.on('ConnectionStateChanged', (newState, reason) => {
            console.log(`New state: ${newState}, Reason: ${reason}`);
            if (newState === 'DISCONNECTED' && reason === 'LOGIN_TOO_OFTEN') {
                setTimeout(() => {
                    clientRef.current.login({ uid, token });
                }, 3000); // Reconnect after 3 seconds
            }
        });
    }

    const handleMessageFromPeer = async (message, MemberId) => {
        message = JSON.parse(message.text);

        if (message.type === 'offer') {
            createAnswer(MemberId, message.offer);
        }
        if (message.type === 'answer') {
            addAnswer(message.answer);
        }
        if (message.type === 'candidate') {
            if (peerConnection) {
                await peerConnection.addIceCandidate(message.candidate);
            }
        }
    }

    const handleUserJoined = async (MemberId) => {
        console.log('A new user Joined the chat');
        createOffer(MemberId);
    }

    const createPeerConnection = async (MemberId) => {
        peerConnection = new RTCPeerConnection(servers);

        remoteStream = new MediaStream();
        document.getElementById('user-2').srcObject = remoteStream;

        localStream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, localStream);
        });

        peerConnection.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                remoteStream.addTrack(track);
            });
        }

        peerConnection.onicecandidate = async (event) => {
            if (event.candidate) {
                clientRef.current.sendMessageToPeer({ text: JSON.stringify({ 'type': 'candidate', 'candidate': event.candidate }) }, MemberId);
            }
        }

        if (!localStream) {
            localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            document.getElementById('user-1').srcObject = localStream;
        }
    }

    const createOffer = async (MemberId) => {
        await createPeerConnection(MemberId);

        let offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        clientRef.current.sendMessageToPeer({ text: JSON.stringify({ 'type': 'offer', 'offer': offer }) }, MemberId);
    }

    const createAnswer = async (MemberId, offer) => {
        await createPeerConnection(MemberId);

        await peerConnection.setRemoteDescription(offer);

        let answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        clientRef.current.sendMessageToPeer({ text: JSON.stringify({ 'type': 'answer', 'answer': answer }) }, MemberId);
    }

    const addAnswer = async (answer) => {
        if (!peerConnection.currentRemoteDescription) {
            await peerConnection.setRemoteDescription(answer);
        }
    }

    useEffect(() => {
        init();

        return () => {
            if (clientRef.current) {
                clientRef.current.logout();
            }
        }
    }, []);

    return (
      <div className='grid grid-cols-2 grid-rows-1 gap-2'>
      <video className='video-player bg-black w-full h-[300px] transform rotate-y-180 ' style={{ transform: 'scaleX(-1)' }} id="user-1" autoPlay playsInline></video>
      <video className='video-player bg-black w-full h-[300px] transform rotate-y-180' style={{ transform: 'scaleX(-1)' }} id="user-2" autoPlay playsInline></video>
  </div>
    )
}

export default VideoChat;
