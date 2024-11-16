import React, { useState, useEffect } from 'react';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from API
    fetch('http://localhost:5000/api/application/postedjobs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // To include cookies or session data if needed
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setJobs(data.jobs);
        } else {
          setError('Failed to load jobs');
        }
      })
      .catch((err) => {
        setError(`Error fetching jobs: ${err.message}`);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Job Listings</h1>
      {jobs.length > 0 ? (
        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-blue-600">{job.title}</h2>
              <p className="text-gray-700 mb-2">{job.description}</p>
              <div className="flex flex-wrap gap-4 mb-4">
                <p className="text-gray-600"><strong>Location:</strong> {job.location}</p>
                <p className="text-gray-600"><strong>Salary Range:</strong> {job.salaryRange}</p>
                <p className="text-gray-600"><strong>Employment Type:</strong> {job.employmentType}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600"><strong>Company:</strong> {job.companyName}</p>
                <p className="text-gray-600"><strong>Recruiter:</strong> {job.recruiterName}</p>
                <p className="text-gray-600"><strong>Role:</strong> {job.role}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <strong className="text-gray-600">Skills:</strong>
                {job.requiredSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-gray-200 text-sm text-gray-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No jobs available.</p>
      )}
    </div>
  );
};

export default JobList;
