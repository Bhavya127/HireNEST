import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Passwordinput from './PasswordInput'; // Ensure this component is correctly handling the password

const Signup = () => {
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
      const response = await fetch('http://localhost:5000/api/auth/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          username: username, // Use the values from state
          email: email,
          password: password
        })
      });
  
      const data = await response.json();
      
      if (data.success) {
        console.log("User created successfully");
        navigate('/verifyotp'); // Redirect to login page after successful registration
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
    <div className="mt-16 ">
      <div className="container flex flex-col justify-center items-center px-4 ">
        <div className="form-container p-6 rounded-3xl max-w-2xl shadow-md border border-gray-200">

          <h2 className='p-2 text-4xl text-center font-semibold mb-5 text-transparent bg-clip-text bg-gradient-to-t from-cyan-500 to-blue-500'>Signup</h2>

          <form onSubmit={handleSubmit}>
            <div className="name grid grid-cols-1 gap-5 mb-5">
              <div className="firstname">
                <label htmlFor="username" className="block">Username</label>
                <input
                  type="text"
                  className="rounded-md p-2 w-full border border-gray-300"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={credentials.username}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="tel-email grid grid-cols-1 gap-5 mb-5">
              <div className="Email">
                <label htmlFor="email" className="block">Email</label>
                <input
                  type="email"
                  className="rounded-md p-2 w-full border border-gray-300"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={credentials.email}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="pass-cpass grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div className="pass">
                <label htmlFor="password" className="block">Password</label>
                <Passwordinput
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                  placeholder="Set Password"
                />
              </div>
              <div className="cpass">
                <label htmlFor="cpassword" className="block">Confirm Password</label>
                <input
                  type="password"
                  className="rounded-md p-2 w-full border border-gray-300"
                  id="cpassword"
                  name="cpassword"
                  placeholder="Confirm Password"
                  value={credentials.cpassword}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="btn">
            <button type="submit" className="text-black bg-gradient-to-r from-cyan-500 to-blue-500 w-full px-1 py-1 rounded-full">
              <div className='w-full bg-white px-5 py-2 rounded-full hover:bg-transparent hover:text-white'>Register</div></button>
            </div>
          </form>
          <div className='text-md text-center mt-3'>
            Already a user? <Link to="/login" className='text-blue-500 font-semibold'>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
