import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

function ApplyJob() {
  const [job, setJob] = useState(null);
  const [profile, setProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const Navigate  = useNavigate();
  const jobId = location.state?.jobId; // Get jobId from location state

  // Fetch the session data to get userId (from the backend)
  useEffect(() => {
    fetch('http://localhost:5000/api/session', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unauthorized or session expired');
        }
        return response.json();
      })
      .then((data) => {
        setUserId(data.userId); // Store userId from the session
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Fetch the user's profile data using the userId
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/api/user/profile`, {
        method: 'GET',
        credentials: 'include',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch profile data');
          }
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            setProfile(data.profile);
          } else {
            setError(data.error || 'Profile data unavailable');
          }
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [userId]);

  // Fetch the job details based on the jobId
  useEffect(() => {
    if (!jobId) return;

    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
        const jobData = await response.json();

        if (response.ok) {
          setJob(jobData.job);
        } else {
          setError('Error fetching job details');
        }
      } catch (err) {
        setError('Failed to fetch job details');
      }
    };

    fetchJobDetails();
  }, [jobId]);

  // Handle the changes in the profile input fields
  const handleInputChange = (e, field) => {
    const newProfile = { ...profile };
    newProfile[field] = e.target.value;
    setProfile(newProfile);
  };

  // Handle changes in skills
  const handleSkillChange = (index, newSkill) => {
    const updatedSkills = [...profile.skills];
    updatedSkills[index] = newSkill;
    setProfile({ ...profile, skills: updatedSkills });
  };

  // Submit the application with updated profile data and job info
  const handleSubmit = () => {
    const jobApplication = {
      userId,
      jobId,
      jobTitle: job.title,
      jobLocation: job.location,
      jobSalaryRange: job.salaryRange,
      jobEmploymentType: job.employmentType,
      jobCompany: job.companyName,
      jobRequiredSkills: job.requiredSkills,
      firstname: profile.firstname,
      lastname: profile.lastname,
      education: profile.education,
      designation: profile.designation,
      skills: profile.skills,
    };

    fetch('http://localhost:5000/api/application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobApplication),
    })
      .then((response) => {
        if (response.ok) {
          alert('Application submitted successfully');
          Navigate('/clienthome')
        } else {
          alert('Error submitting application');
        }
      })
      .catch((err) => {
        console.error('Error:', err);
        alert('Failed to submit application');
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {/* Job details and profile section combined */}
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">{job.title}</h2>
        <p className="text-lg mb-4">{job.description}</p>
        <p className="mb-2"><strong>Location:</strong> {job.location}</p>
        <p className="mb-2"><strong>Salary Range:</strong> {job.salaryRange}</p>
        <p className="mb-2"><strong>Employment Type:</strong> {job.employmentType}</p>
        <p className="mb-2"><strong>Company:</strong> {job.companyName}</p>
        <p className="mb-4"><strong>Required Skills:</strong> {job.requiredSkills.join(', ')}</p>

        {/* User profile section */}
        {profile && (
          <div className="w-full max-w-4xl bg-white border border-gray-300 rounded-lg shadow-lg p-8 space-y-10 relative">
            <h3 className="text-2xl font-bold mb-4">Your Profile</h3>

            {/* First Name */}
            <div className="mb-4">
              <label htmlFor="firstname" className="block text-sm font-medium">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                value={profile.firstname}
                onChange={(e) => handleInputChange(e, 'firstname')}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label htmlFor="lastname" className="block text-sm font-medium">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                value={profile.lastname}
                onChange={(e) => handleInputChange(e, 'lastname')}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            {/* Education */}
            <div className="mb-4">
              <label htmlFor="education" className="block text-sm font-medium">
                Education
              </label>
              <input
                type="text"
                id="education"
                value={profile.education}
                onChange={(e) => handleInputChange(e, 'education')}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            {/* Designation */}
            <div className="mb-4">
              <label htmlFor="designation" className="block text-sm font-medium">
                Designation
              </label>
              <input
                type="text"
                id="designation"
                value={profile.designation}
                onChange={(e) => handleInputChange(e, 'designation')}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            {/* Skills */}
            <div className="mb-4">
              <label htmlFor="skills" className="block text-sm font-medium">
                Skills
              </label>
              {profile.skills.map((skill, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-4/5"
                  />
                </div>
              ))}
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              className="text-white bg-cyan-500 p-3 rounded-md w-full"
            >
              Submit Application
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default ApplyJob;
