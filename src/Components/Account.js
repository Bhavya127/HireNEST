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
        const profileResponse = await fetch('http://localhost:5000/api/create/profile', {
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
    <div className="p-2 min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col">
  {/* Header Section */}
  <div className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-8 flex items-center justify-between rounded-lg">
    <div className="flex items-center space-x-6">
      <div className="flex-shrink-0">
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-md">
          <FontAwesomeIcon icon={faUser} className="text-6xl text-cyan-500" />
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-bold">
          {userData.profile.firstname} {userData.profile.lastname}
        </h1>
        <p className="text-2xl opacity-90">{userData.profile.designation || 'No designation available'}</p>
        <p className="mt-2 text-white/90">{userData.profile.bio || 'Write something about yourself'}</p>
      </div>
    </div>
    <button
      onClick={() => alert('Edit profile functionality here')}
      className="bg-white text-cyan-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
    >
      Edit Profile
    </button>
  </div>

  {/* Main Content Section */}
  <div className="flex-1 py-8 px-1 grid grid-cols-3 gap-6 w-full">
    {/* Profile Details */}
    <div className="col-span-1 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700">Profile Details</h2>
      <div className="mt-6 space-y-6">
        {['Designation', 'Education', 'Skills'].map((section, index) => (
          <div key={index}>
            <div className="flex justify-between items-center">
              <h3 className="text-gray-600">{section}</h3>
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="text-gray-500 hover:text-cyan-500 cursor-pointer"
                onClick={() => alert(`Edit ${section.toLowerCase()} functionality here`)}
              />
            </div>
            <p className="text-gray-800 mt-1">
              {section === 'Designation'
                ? userData.profile.designation
                : section === 'Education'
                ? userData.profile.education
                : userData.profile.skills.length > 0
                ? userData.profile.skills.join(', ')
                : 'Not provided'}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Your Posts Section */}
    <div className="col-span-2 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700">Your Posts</h2>
      <div className="mt-6 space-y-6">
        {userData.posts && userData.posts.length > 0 ? (
          userData.posts.map((post, index) => (
            <div
              key={index}
              className="bg-gray-50 border rounded-lg p-6 shadow-md hover:shadow-lg transition"
            >
              <h4 className="text-lg font-semibold text-gray-800">{post.body}</h4>
              {post.image && (
                <img
                  src={post.image.url || constructImageUrl(post.image.public_id)}
                  alt="Post"
                  className="mt-4 w-full h-40 object-cover rounded-lg"
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


  );
}

export default Account;
