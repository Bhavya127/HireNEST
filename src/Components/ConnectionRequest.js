import React, { useEffect, useState } from 'react';

function ConnectionRequest({ userId }) {
  const [connections, setConnections] = useState([]); // Stores user's current connections
  const [requests, setRequests] = useState([]); // Stores pending connection requests
  const [loading, setLoading] = useState(true); // Loading state to show loading spinner or message

  useEffect(() => {
    // Fetching user's connections
    fetch(`http://localhost:5000/api/connections/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setConnections(data.connections); // Assuming API returns data in the form { connections: [...] }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching connections:', error);
        setLoading(false);
      });

    // Fetching pending requests
    fetch(`http://localhost:5000/api/connections/requests/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setRequests(data.requests); // Assuming API returns data in the form { requests: [...] }
      })
      .catch((error) => {
        console.error('Error fetching requests:', error);
      });
  }, [userId]);

  // Function to send connection request to a recipient
  const sendRequest = (recipientId) => {
    fetch('http://localhost:5000/api/connections/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requesterId: userId, recipientId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert('Request sent successfully');
        }
      })
      .catch((error) => {
        console.error('Error sending connection request:', error);
      });
  };

  // Function to accept a pending connection request
  const acceptRequest = (connectionId) => {
    fetch('http://localhost:5000/api/connections/accept', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ connectionId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert('Connection accepted');
          setConnections((prev) => [...prev, data.connection]);
        }
      })
      .catch((error) => {
        console.error('Error accepting connection request:', error);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Your Connections</h2>
      <ul>
        {connections.length > 0 ? (
          connections.map((connection) => (
            <li key={connection._id}>
              {connection.requester.firstname} {connection.requester.lastname} - Connected
            </li>
          ))
        ) : (
          <li>No connections yet.</li>
        )}
      </ul>

      <h2>Send Connection Request</h2>
      {/* Here you need to replace `recipientId` with an actual recipient ID */}
      <button onClick={() => sendRequest('recipientId')}>Send Request</button>

      <h2>Pending Requests</h2>
      <ul>
        {requests.length > 0 ? (
          requests.map((request) => (
            <li key={request._id}>
              {request.requester.firstname} {request.requester.lastname}
              <button onClick={() => acceptRequest(request._id)}>Accept</button>
            </li>
          ))
        ) : (
          <li>No pending requests.</li>
        )}
      </ul>
    </div>
  );
}

export default ConnectionRequest;
