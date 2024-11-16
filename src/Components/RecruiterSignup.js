import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Passwordinput from './PasswordInput'; // Ensure this component is correctly handling the password

const RecruiterSignup = () => {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, cpassword } = credentials;

    // Basic validation
    if (password !== cpassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/recruiter/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          username: username,
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (data.success) {
        console.log("User created successfully");
        navigate('/recruiterProfile');
      } else {
        console.log("Error:", data.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex items-center justify-center h-[80vh] p-6">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-xl border-2 border-blue-100 overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Section: Recruiter Illustration */}
        <div className="hidden md:flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-8">
          <div className="text-center">
           
            <h2 className="text-3xl font-bold mb-2">Welcome, Recruiter!</h2>
            <p className="text-lg">
              Join our platform to find the best talent for your organization. Sign up to access powerful tools that will help you in the recruitment process.
            </p>
          </div>
        </div>

        {/* Right Section: Signup Form */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
            Create a Recruiter Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Organization Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                id="username"
                name="username"
                placeholder="Your organization name"
                value={credentials.username}
                onChange={onChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Official Email Address
              </label>
              <input
                type="email"
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                id="email"
                name="email"
                placeholder="your.email@organization.com"
                value={credentials.email}
                onChange={onChange}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Passwordinput
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                  placeholder="Set Password"
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="cpassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  id="cpassword"
                  name="cpassword"
                  placeholder="Confirm Password"
                  value={credentials.cpassword}
                  onChange={onChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center px-4 py-3 text-lg text-white font-bold bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-md hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ease-in-out duration-300 transform hover:scale-105"
            >
              Register as Recruiter
            </button>
          </form>

          <div className="text-center mt-5 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline font-medium">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruiterSignup;
