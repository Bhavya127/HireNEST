import React, { useEffect, useState } from 'react';

const RecruiterInfo = () => {
  const [recruiter, setRecruiter] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/recruiter/info', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // Send cookies with request
        });

        const data = await response.json();
        if (data.success) {
          setRecruiter(data.profile);
        } else {
          console.error('Failed to fetch profile:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!recruiter) {
    return <p className="text-center text-gray-400 mt-10">Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-2xl mx-4 sm:mx-auto">
        <h1 className="text-5xl font-bold text-center text-blue-500 mb-10 tracking-wide">
          Recruiter Profile
        </h1>

        <div className="space-y-6">
          <div className="p-5 bg-gray-50 rounded-lg flex items-center justify-between">
            <h2 className="text-xl font-medium text-gray-800">Name:</h2>
            <p className="text-lg font-light text-gray-700">{recruiter.recruiterId.username}</p>
          </div>

          <div className="p-5 bg-gray-50 rounded-lg flex items-center justify-between">
            <h2 className="text-xl font-medium text-gray-800">Email:</h2>
            <p className="text-lg font-light text-gray-700">{recruiter.recruiterId.email}</p>
          </div>

          <div className="p-5 bg-gray-50 rounded-lg flex items-center justify-between">
            <h2 className="text-xl font-medium text-gray-800">Company:</h2>
            <p className="text-lg font-light text-gray-700">{recruiter.companyName}</p>
          </div>

          <div className="p-5 bg-gray-50 rounded-lg flex items-center justify-between">
            <h2 className="text-xl font-medium text-gray-800">Role:</h2>
            <p className="text-lg font-light text-gray-700">{recruiter.role}</p>
          </div>

          <div className="p-5 bg-gray-50 rounded-lg flex items-center justify-between">
            <h2 className="text-xl font-medium text-gray-800">Location:</h2>
            <p className="text-lg font-light text-gray-700">{recruiter.location}</p>
          </div>
        </div>

        <div className="text-center mt-10">
          <button className="px-8 py-3 font-semibold text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterInfo;
