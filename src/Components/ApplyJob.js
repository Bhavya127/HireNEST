import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ApplyJob() {
  const [job, setJob] = useState(null);
  const [profile, setProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [recruiterId, setRecruiterId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const jobId = location.state?.jobId;

  // Fetch session data to get userId
  useEffect(() => {
    fetch('http://localhost:5000/api/session', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) throw new Error('Unauthorized or session expired');
        return response.json();
      })
      .then((data) => {
        setUserId(data.userId);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Fetch the user's profile data
  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:5000/api/create/profile`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch profile data');
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
  }, [userId]);

  // Fetch the job details
  useEffect(() => {
    if (!jobId) return;

    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
        const jobData = await response.json();

        if (response.ok) {
          setJob(jobData.job);
          setRecruiterId(jobData.job.recruiterId);
        } else {
          setError('Error fetching job details');
        }
      } catch (err) {
        setError('Failed to fetch job details');
      }
    };

    fetchJobDetails();
  }, [jobId]);

  // Handle input field changes
  const handleInputChange = (e, field) => {
    setProfile((prevProfile) => ({ ...prevProfile, [field]: e.target.value }));
  };

  // Handle skills changes
  const handleSkillChange = (index, newSkill) => {
    const updatedSkills = [...profile.skills];
    updatedSkills[index] = newSkill;
    setProfile((prevProfile) => ({ ...prevProfile, skills: updatedSkills }));
  };

  // Submit the application
  const handleSubmit = () => {
    if (!userId || !jobId || !profile) {
      alert('Required data is missing');
      return;
    }

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
      recruiterId,
    };

    fetch('http://localhost:5000/api/application/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobApplication),
      credentials: 'include',
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          alert('Application submitted successfully');
          navigate('/clienthome');
        } else {
          console.error('Error response from server:', data);
          alert(`Error submitting application: ${data.message || 'Unknown error'}`);
        }
      })
      .catch((err) => {
        console.error('Network or Fetch Error:', err);
        alert('Failed to submit application. Please check your network connection.');
      });
  };

  // Loading or error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {job && (
        <>
          <h2 className="text-3xl font-bold mb-4">{job.title}</h2>
          <p className="text-lg mb-4">{job.description}</p>
          <p className="mb-2"><strong>Location:</strong> {job.location}</p>
          <p className="mb-2"><strong>Salary Range:</strong> {job.salaryRange}</p>
          <p className="mb-2"><strong>Employment Type:</strong> {job.employmentType}</p>
          <p className="mb-2"><strong>Company:</strong> {job.companyName}</p>
          <p className="mb-4"><strong>Required Skills:</strong> {job.requiredSkills.join(', ')}</p>
        </>
      )}

      {profile && (
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-8 space-y-6">
          <h3 className="text-2xl font-bold mb-4">Your Profile</h3>
          <div>
            <label htmlFor="firstname" className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              id="firstname"
              value={profile.firstname}
              onChange={(e) => handleInputChange(e, 'firstname')}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label htmlFor="lastname" className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              id="lastname"
              value={profile.lastname}
              onChange={(e) => handleInputChange(e, 'lastname')}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label htmlFor="education" className="block text-sm font-medium">Education</label>
            <input
              type="text"
              id="education"
              value={profile.education}
              onChange={(e) => handleInputChange(e, 'education')}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label htmlFor="designation" className="block text-sm font-medium">Designation</label>
            <input
              type="text"
              id="designation"
              value={profile.designation}
              onChange={(e) => handleInputChange(e, 'designation')}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label htmlFor="skills" className="block text-sm font-medium">Skills</label>
            {profile.skills.map((skill, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Apply Now
          </button>
        </div>
      )}
    </div>
  );
}

export default ApplyJob;
