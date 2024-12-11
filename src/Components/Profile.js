import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './#chat.css';
import AllData from './AllData.json';
import AllSkills from './AllSkills.json';

function Profile() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [designation, setDesignation] = useState('');
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [allSkills, setAllSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const navigate = useNavigate();

  const designations = [
    'Undergraduate',
    'Student',
    'Employee',
    'Intern',
    'Freelancer',
    'Other'
  ];

  // Fetch university data from local JSON
  useEffect(() => {
    setData(AllData);
  }, []);

  // Load skills data from the imported JSON
  useEffect(() => {
    setAllSkills(AllSkills.map(skillObj => skillObj.skill));
  }, []);

  // Filter universities based on the search term
  useEffect(() => {
    const results = searchTerm
      ? data.filter(item => {
          const name = item.name || item.Name || '';
          const city = item.city || item.City || '';
          const state = item.state || item.State || '';
          return (
            name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            state.toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
      : [];
    setFilteredData(results);
  }, [searchTerm, data]);

  // Filter skills based on skill input
  useEffect(() => {
    const results = skillInput
      ? allSkills.filter(skill => skill.toLowerCase().includes(skillInput.toLowerCase()))
      : [];
    setFilteredSkills(results);
  }, [skillInput, allSkills]);

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const handleSelect = (university) => {
    const universityDisplay = `${university.name || university.Name}, ${university.city || university.City}, ${university.state || university.State}`;
    setSearchTerm(universityDisplay);
    setSelectedUniversity(university);
    setFilteredData([]);
  };

  const addSkill = (skill) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setSkillInput('');
    }
  };

  const removeSkill = (index) => setSkills(skills.filter((_, i) => i !== index));

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Ensure that education is not empty or undefined
    const profileData = {
      firstname: firstName,
      lastname: lastName,
      education: selectedUniversity
        ? `${selectedUniversity.name || selectedUniversity.Name}, ${selectedUniversity.city || selectedUniversity.City}, ${selectedUniversity.state || selectedUniversity.State}`
        : null, // Set education to null if no university is selected
      designation,
      skills,
    };
  
    // Check if education is missing and show an error
    if (!profileData.education) {
      alert('Please select a university.');
      return; // Prevent form submission if education is empty
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/create/profile', profileData, {
        withCredentials: true, // This sends the session cookie automatically
      });
  
      if (response.status === 201) {
        // On success, you can redirect to the profile page or another page
        navigate('/applicant/login');
      }
    } catch (error) {
      console.error('There was an error saving the profile!', error);
    }
  };
  

  return (
    <div className="flex place-content-center">
      <form onSubmit={handleSubmit} className="w-1/2 border border-gray-300 rounded-lg bg-slate-50 shadow-lg">
        <div className="header text-4xl text-cyan-600 bg-white p-5 rounded-lg">
          Profile Setup
          <FontAwesomeIcon className="float-end h-5" icon={faPenToSquare} />
        </div>

        {/* Name Fields */}
        <div className="my-2 text-3xl bg-white rounded-md p-2">
          <div className="flex gap-24 px-3 py-2">
            <div>
              <label htmlFor="firstName" className="block text-xl">First Name:</label>
              <input
                type="text"
                id="firstName"
                className="line-input bg-white"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-xl">Last Name:</label>
              <input
                type="text"
                id="lastName"
                className="line-input"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Designation Dropdown */}
        <div className="my-2 text-3xl bg-white rounded-md p-2">
          <div className="flex flex-col px-3 py-2">
            <label htmlFor="designation" className="block text-xl">
              Designation:
            </label>
            <select
              id="designation"
              className="line-input bg-white"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            >
              <option value="">Select Designation</option>
              {designations.map((designation, index) => (
                <option key={index} value={designation}>
                  {designation}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* University Search */}
        <div className="my-2 text-3xl bg-white rounded-md p-2">
          <div className="flex flex-col px-3 py-2">
            <label htmlFor="universitySearch" className="block text-xl">
              University:
            </label>
            <input
              type="text"
              id="universitySearch"
              className="line-input bg-white hover:line-input"
              placeholder="Search for your university"
              value={searchTerm}
              onChange={handleSearch}
            />
            {filteredData.length > 0 && (
              <ul className="dropdown bg-white shadow-lg mt-2 rounded-lg max-h-60 overflow-y-auto">
                {filteredData.map((university, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(university)}
                    className="cursor-pointer hover:bg-gray-200 p-2"
                  >
                    {`${university.name || university.Name}, ${university.city || university.City}, ${university.state || university.State}`}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Skills Selection */}
        <div className="my-2 text-3xl bg-white rounded-md p-2">
          <div className="flex flex-col px-3 py-2">
            <label htmlFor="skills" className="block text-xl">
              Skills:
            </label>
            <input
              type="text"
              id="skills"
              className="line-input"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Search or Add Skill"
            />
            <ul className="max-h-40 overflow-y-auto">
              {filteredSkills.map((skill, index) => (
                <li
                  key={index}
                  className="dropdown bg-white shadow-lg mt-2 rounded-lg max-h-60 overflow-y-auto cursor-pointer"
                  onClick={() => addSkill(skill)}
                >
                  {skill}
                </li>
              ))}
            </ul>
            <div className="mt-2">
              {skills.map((skill, index) => (
                <span key={index} className="inline-block bg-cyan-500 px-2 py-1 rounded-full mr-2 text-xl text-white">
                  {skill}
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="ml-2 cursor-pointer"
                    onClick={() => removeSkill(index)}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn w-full mt-5 text-xl bg-cyan-600 py-2 text-white"
          disabled={!firstName || !lastName || !designation || !skills.length}
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;
