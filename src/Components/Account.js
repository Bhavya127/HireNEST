import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import reactpng from './Images/React.png';
import ConnectionRequest from './ConnectionRequest';

function Account() {
  const [userData, setUserData] = useState({
    userId: null,
    profile: null,
    posts: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cloudinaryBaseUrl = 'https://res.cloudinary.com/dyuyehrgv/image/upload/v1731485684/';

  const constructImageUrl = (public_id) => `${cloudinaryBaseUrl}${public_id}`;

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/session', {
          method: 'GET',
          credentials: 'include',
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch session');
        }
  
        const data = await response.json();
        if (data.userId && data.profile) {
          setUserData({
            userId: data.userId,
            profile: data.profile,
            posts: [], // You can fetch posts separately in another effect
          });
        } else {
          throw new Error('Session does not contain required data');
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchSessionData();
  }, []);
  

  useEffect(() => {
    if (!userData.userId) return;
  
    const fetchProfileAndPosts = async () => {
      try {
        // Fetch profile
        const profileResponse = await fetch('http://localhost:5000/api/user/profile', {
          method: 'GET',
          credentials: 'include',
        });
        if (!profileResponse.ok) throw new Error('Failed to fetch profile');
        const profileData = await profileResponse.json();
        setUserData((prevData) => ({ ...prevData, profile: profileData.profile }));
  
        // Fetch posts
        const postsResponse = await fetch('http://localhost:5000/api/images/getposts', {
          method: 'GET',
          credentials: 'include',
        });
        if (!postsResponse.ok) throw new Error('Failed to fetch posts');
        const postsData = await postsResponse.json();
  
        // Ensure the posts data is in the correct format
        if (postsData && postsData.posts) {
          setUserData((prevData) => ({ ...prevData, posts: postsData.posts }));
        } else {
          throw new Error('Invalid posts data format');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfileAndPosts();
  }, [userData.userId]);
  

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  if (!userData.profile) return <div className="text-center mt-10">No profile data available.</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-12">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl p-10">
        <div className="flex flex-col md:flex-row items-center md:space-x-10">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-500 p-12 rounded-full shadow-md">
            <FontAwesomeIcon icon={faUser} className="h-20 text-white" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-semibold text-gray-800">
              {userData.profile.firstname} {userData.profile.lastname}
            </h1>
            <p className="text-lg text-gray-600">{userData.profile.designation || 'No designation available'}</p>
            <p className="text-gray-500">{userData.profile.bio || 'Write something about yourself'}</p>
          </div>
          <div>
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="text-2xl text-gray-500 hover:text-cyan-500 cursor-pointer"
              onClick={() => alert('Edit profile functionality here')}
            />
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-3xl font-semibold text-gray-800">Profile Details</h2>
          <div className="mt-6 space-y-8">
            <div className="border-b pb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium text-gray-700">Designation</h3>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="text-gray-500 hover:text-cyan-500 cursor-pointer"
                  onClick={() => alert('Edit designation functionality here')}
                />
              </div>
              <p className="text-gray-600 mt-1">{userData.profile.designation || 'Not provided'}</p>
            </div>
            <div className="border-b pb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium text-gray-700">Education</h3>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="text-gray-500 hover:text-cyan-500 cursor-pointer"
                  onClick={() => alert('Edit education functionality here')}
                />
              </div>
              <p className="text-gray-600 mt-1">{userData.profile.education || 'Not provided'}</p>
            </div>
            <div className="pb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium text-gray-700">Skills</h3>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="text-gray-500 hover:text-cyan-500 cursor-pointer"
                  onClick={() => alert('Edit skills functionality here')}
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-4">
                {userData.profile.skills && userData.profile.skills.length > 0 ? (
                  userData.profile.skills.map((skill, index) => (
                    <div key={index} className="flex items-center bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-lg shadow p-3">
                      <img className="h-10 w-10 rounded-full" src={reactpng} alt={skill} />
                      <span className="ml-3 text-gray-700">{skill}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No skills added</p>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-700">Your Posts</h3>
              <div className="mt-4 space-y-6">
                {userData.posts && userData.posts.length > 0 ? (
                  userData.posts.map((post, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50 shadow-sm">
                      <h4 className="text-lg font-semibold text-gray-700">{post.body}</h4>
                      {post.image && (
                        <img
                          src={post.image.url || constructImageUrl(post.image.public_id)}
                          alt="Post"
                          className="mt-2 rounded-lg max-w-full"
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No posts available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
