import React,{useState} from 'react';
import {Link , useNavigate} from 'react-router-dom';
import Passwordinput from './PasswordInput';

function RecruiterLogin() {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {email, password} = credentials;



    try {
      const response = await fetch('http://localhost:5000/api/recruiter/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (data.success) {
        console.log("Recruiter Logged in successfully");
        navigate('/recruiter/dashboard');
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
    <>
    <div className="flex items-center justify-center min-h-screen ">
  <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
    <div className="text-center mb-6">
      <h2 className="text-3xl font-extrabold text-gray-800">Recruiter Login</h2>
      <p className="text-gray-600">Sign in to manage job postings and applicants</p>
    </div>

    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          onChange={onChange}
          type="email"
          name='email'
          value = {credentials.email}
          placeholder="recruiter@company.com"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow duration-200"
        />
      </div>

      <Passwordinput placeholder="password" value={credentials.password} onChange={onChange} name="password" className="focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
      
      
      <div className="flex items-center justify-end">
        <Link to="#" className="text-sm text-blue-500 hover:underline">Forgot password?</Link>
      </div>
      
      <button className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-500 hover:to-cyan-500 transition-colors duration-200">
        Login
      </button>
    </form>
    
    <p className="mt-6 text-center text-gray-600 text-sm">
      Don't have an account? <Link to="/recruiter/signup" className="text-blue-500 hover:underline">Sign up</Link>
    </p>
  </div>
</div>

      
    </>
  )
}

export default RecruiterLogin
