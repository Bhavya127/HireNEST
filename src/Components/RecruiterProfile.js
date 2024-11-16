import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function RecruiterProfileForm() {
  // Initialize form data with empty strings
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    recruiterName: '',
    role: '',
    companyDescription: '',
    industry: '',
    location: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/recruiter/profile', {
        method: 'POST',
        credentials: 'include', // Important to send cookies/session data
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Profile created successfully!');
        navigate("/recruiter/dashboard");
      } else {
        alert(data.message || 'Error creating profile');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the profile.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-semibold mb-8 text-center text-cyan-600">Recruiter Profile</h2>
        
        {/* Company Name */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter company name"
            required
          />
        </div>

        {/* Recruiter Name */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2">Recruiter Name</label>
          <input
            type="text"
            name="recruiterName"
            value={formData.recruiterName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Role */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Your role (e.g., Senior Recruiter)"
            required
          />
        </div>

        {/* Company Description */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2">Company Description</label>
          <textarea
            name="companyDescription"
            value={formData.companyDescription}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Tell applicants what makes your company a great place to work"
            rows="4"
            required
          />
        </div>

        {/* Industry */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2">Industry</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="E.g., Software Development, Healthcare"
            required
          />
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-medium mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            placeholder="City, State (e.g., San Francisco, CA)"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default RecruiterProfileForm;
