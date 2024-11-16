import React, { useEffect, useState } from 'react';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/application/appliedjobs', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await response.json();
        if (data.success) {
          setApplications(data.applications);
        } else {
          console.error('Failed to fetch applications');
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Job Applications</h1>
      <div className="space-y-6">
        {applications.map((application) => (
          <div
            key={application._id}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">{application.jobTitle}</h2>
              <span className="text-sm text-gray-500">{application.jobLocation}</span>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <strong>Company:</strong> {application.jobCompany}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <strong>Salary Range:</strong> {application.jobSalaryRange}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <strong>Employment Type:</strong> {application.jobEmploymentType}
            </div>
            <div className="mt-4">
              <strong className="block text-lg text-gray-700">Skills Required:</strong>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                {application.jobRequiredSkills.map((skill, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <strong className="block text-lg text-gray-700">Applicant Information:</strong>
              <div className="text-sm text-gray-600 mt-2">
                <strong>Name:</strong> {application.firstname} {application.lastname}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                <strong>Education:</strong> {application.education}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                <strong>Designation:</strong> {application.designation}
              </div>
              <div className="mt-2">
                <strong className="block text-gray-700">Skills:</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {application.skills.map((skill, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-500">
              Applied on: {new Date(application.appliedAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Applications;
