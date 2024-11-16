import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function PostJob() {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    industry: '',
    requiredSkills: '', // Keep this as a string for input
    salaryRange: '',
    employmentType: 'Full-time',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Split requiredSkills into an array and trim whitespace
    const requiredSkillsArray = formData.requiredSkills
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill !== '');

    // Prepare the data to send to the server
    const dataToSubmit = {
      ...formData,
      requiredSkills: requiredSkillsArray, // Update to use array
    };

    try {
      const response = await fetch('http://localhost:5000/api/jobs/createJob', {
        method: 'POST',
        credentials: 'include', // Important to send cookies/session data
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Job posted successfully!');
        Navigate('/recruiter/dashboard')
        // Reset the form after successful submission
        setFormData({
          title: '',
          description: '',
          location: '',
          industry: '',
          requiredSkills: '',
          salaryRange: '',
          employmentType: 'Full-time',
        });
      } else {
        alert(data.error || 'Error posting job');
      }
    } catch (error) {
      console.error('Error posting job:', error);
      alert('An error occurred while posting the job.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-semibold mb-8 text-center text-cyan-600">Post a Job</h2>

        {/* Job Fields */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter job title"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter job description"
            rows="4"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter location"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2">Industry</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter industry"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2">Required Skills (comma separated)</label>
          <input
            type="text"
            name="requiredSkills"
            value={formData.requiredSkills}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter required skills"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2">Salary Range</label>
          <input
            type="text"
            name="salaryRange"
            value={formData.salaryRange}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter salary range"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2">Employment Type</label>
          <select
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white text-lg rounded-lg"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}

export default PostJob;
