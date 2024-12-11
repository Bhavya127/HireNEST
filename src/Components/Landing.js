import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // React Router's useNavigate hook

  // Fetch job data
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/jobs/all/jobs');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div className="flex justify-center items-center mt-20"><div className="animate-spin w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full"></div></div>;

  if (error) return <p className="text-red-500 text-center mt-5">{error}</p>;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Available Job Listings</h1>
      
      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs available at the moment</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{job.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{job.location}</p>
              <p className="text-sm text-gray-500 mb-4 line-clamp-3">{job.description}</p>
              
              <div className="flex justify-between items-center">
                <button
                  onClick={() => navigate('/applyjobs', { state: { jobId: job._id, recruiterId: job.recruiterId } })}
                  className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-cyan-600 transition-all ease-in-out"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Landing;
