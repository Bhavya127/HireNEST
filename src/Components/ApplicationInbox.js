import React, { useEffect, useState } from 'react';

const ApplicationInbox = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/application/applicationInbox', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include cookies for session-based authentication
        });

        if (!response.ok) {
          throw new Error('Failed to fetch applications.');
        }

        const data = await response.json();
        setApplications(data.applications);
      } catch (err) {
        setError(err.message || 'Failed to fetch applications.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-400">
        Job Applications
      </h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <p className="text-lg text-gray-600 animate-pulse">Loading...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center">
          <p className="text-lg text-red-600 font-semibold">{error}</p>
        </div>
      ) : applications.length > 0 ? (
        applications.map((application) => (
          <div
            key={application._id}
            className="mb-8 p-6 bg-gradient-to-r from-white via-gray-100 to-gray-200 shadow-lg rounded-lg hover:shadow-2xl transition-shadow transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800 hover:text-blue-500 transition-colors cursor-pointer">
                {application.jobTitle}
              </h2>
              <span className="text-sm font-medium text-gray-600">{application.jobLocation}</span>
            </div>

            <div className="mt-2 text-gray-600">
              <p><strong>Salary Range:</strong> {application.jobSalaryRange}</p>
              <p><strong>Employment Type:</strong> {application.jobEmploymentType}</p>
              <p><strong>Company:</strong> {application.jobCompany}</p>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-xl text-gray-800">Applicant Details:</h3>
              <div className="flex items-center space-x-4 mt-4 p-4 bg-white shadow-sm rounded-lg hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
                  <img
                    src={`https://ui-avatars.com/api/?name=${application.firstname}+${application.lastname}`}
                    alt={`${application.firstname} ${application.lastname}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold">{application.firstname} {application.lastname}</p>
                  <p className="mt-1 text-sm text-gray-500"><strong>Education:</strong> {application.education}</p>
                  <p className="mt-1 text-sm text-gray-500"><strong>Designation:</strong> {application.designation}</p>
                  <p className="mt-1 text-sm text-gray-500"><strong>Skills:</strong> {application.skills.join(', ')}</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">View Profile</button>
                  <div className="space-x-2">
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No applications yet for this recruiter.</p>
      )}
    </div>
  );
};

export default ApplicationInbox;
