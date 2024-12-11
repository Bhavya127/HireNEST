import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './SidebarComponents/Sidebar';
import SymbolicNavabar from './SidebarComponents/SymbolicNavabar';
import Landing from './Landing';

export default function ClientHome() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState({ jobs: [], users: [] });
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); 

  // Fetch search results from backend
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/user/search?query=${searchQuery}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (response.ok) {
        setResults(data);
        setError(null); // Clear any previous errors
      } else {
        setError(data.message || 'Error fetching results');
      }
    } catch (err) {
      setError('Failed to fetch results');
      console.error('Fetch Error:', err);
    }
  };

  // Function to navigate to the user's profile
  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`); // Navigate to user profile with userId in URL
  };

  return (
    <div>
      <div className="float-end w-fit">
        <div className="flex flex-col mt-16 rounded-md">
          {isOpen ? <Sidebar /> : <SymbolicNavabar />}
        </div>
      </div>

      <div className="flex justify-between">
        <div className="search-bar flex mx-5">
          <input
            type="text"
            name="title"
            placeholder="Search by job title, user name, or designation"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-3 border bg-black text-white rounded-l-full w-96"
          />
          <button
            onClick={handleSearch}
            className="bg-cyan-600 p-3 text-white rounded-r-full"
          >
            Search
          </button>
        </div>
        <div className="mt-3">
          <Link to="/createpost" className="bg-black rounded-full text-white p-3">
            + Create Post
          </Link>
        </div>
      </div>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      {/* Display Job Results with absolute positioning */}
      <div className="job-list mt-20 px-5 w-3/5 absolute z-10 top-16 left-0 right-0 bg-white rounded-xl">
        {results.jobs.length > 0 ? (
          results.jobs.map((job) => (
            <div key={job._id} className="p-5 bg-white my-3 rounded-3xl shadow-lg border border-gray-300">
              <h3 className="text-lg font-bold">Role: {job.title}</h3>
              <p>Company Name: {job.companyName}</p>
              <p>Description: {job.description}</p>
              <p>Required Skills: {Array.isArray(job.requiredSkills) ? job.requiredSkills.join(', ') : job.requiredSkills}</p>
              <p>Working: {job.employmentType}</p>
              <p>Location: {job.location}</p>
              <p>Posted By: {job.recruiterName}</p>

              <div className="text-right">
                <button
                  onClick={() => navigate('/applyjobs', { state: { jobId: job._id, recruiterId: job.recruiterId } })}
                  className="text-black bg-gradient-to-r from-cyan-500 to-blue-500 px-1 py-4 rounded-3xl"
                >
                  <span className="bg-white px-3 py-3 rounded-3xl hover:bg-transparent hover:text-white">
                    Apply
                  </span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>

      {/* Display User Results */}
      <div className="user-list mt-16 px-5 w-3/5 absolute z-10 top-24 left-0 right-0 bg-white shadow-lg rounded-xl">
        {results.users.length > 0 ? (
          results.users.map((user) => (
            <div
              key={user._id}
              className="p-5 bg-white my-3 rounded-3xl shadow-lg border border-gray-300 cursor-pointer"
              onClick={() => handleUserClick(user.userId)}  
            >
              <h3 className="text-lg font-bold">Name: {user.firstname} {user.lastname}</h3>
              <p>Designation: {user.designation}</p>
              <p>Education: {user.education}</p>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>

      {/* Landing component */}
      <Landing />
    </div>
  );
}
