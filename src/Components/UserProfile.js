import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export default function UserProfile() {
  const { userId } = useParams(); // Extract userId from URL
  const [userInfo, setUserInfo] = useState(null);
  const [userPosts, setUserPosts] = useState([]); // State to store posts
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/${userId}`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        if (response.ok) {
          setUserInfo(data.profile); // Adjust to access the 'profile' field
        } else {
          setError(data.message || 'Error fetching user information');
        }
      } catch (err) {
        setError('Failed to fetch user information');
        console.error('Fetch Error:', err);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/getposts/${userId}`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
    
        const data = await response.json();
        if (response.ok) {
          setUserPosts(data.posts); // Set the posts data
        } else {
          setError(data.message || 'Error fetching posts');
        }
      } catch (err) {
        setError('Failed to fetch posts');
        console.error('Fetch Error:', err);
      }
    };
    

    fetchUserInfo();
    fetchUserPosts(); // Fetch posts when component mounts
  }, [userId]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!userInfo) {
    return <p>Loading user information...</p>;
  }

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
              {userInfo.firstname} {userInfo.lastname}
            </h1>
            <p className="text-2xl opacity-90">{userInfo.designation || 'No designation available'}</p>
            <p className="mt-2 text-white/90">{userInfo.bio || 'Write something about yourself'}</p>
          </div>
        </div>
        <button
          onClick={() => alert('Connection Request functionality here')}
          className="bg-white text-cyan-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Connection Request
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
                    ? userInfo.designation
                    : section === 'Education'
                    ? userInfo.education
                    : userInfo.skills.length > 0
                    ? userInfo.skills.join(', ')
                    : 'Not provided'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Your Posts Section */}
        <div className="col-span-2 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700">Posts</h2>
          <div className="mt-6 space-y-6">
            {userPosts && userPosts.length > 0 ? (
              userPosts.map((post, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border rounded-lg p-6 shadow-md hover:shadow-lg transition"
                >
                  <h4 className="text-lg font-semibold text-gray-800">{post.body}</h4>
                  {post.image && (
                    <img
                      src={post.image.url}
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
