import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Passwordinput from './PasswordInput';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = credentials;

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify({ username, password })
    });

    const json = await response.json();

    if (json.success) {
      console.log("User login successful");
      navigate("/ClientHome");
    } else {
      console.log("Some error occurred");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className="mt-16">
      <div className="container flex flex-col justify-center items-center px-4">
        <div className="form-container p-6 rounded-3xl shadow-md border border-gray-200 w-1/3 max-w-2xl">
          <h2 className='p-2 text-4xl text-center font-semibold mb-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text'>Login</h2>
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
                  onChange={onChange} 
                  value={credentials.username} 
                />
              </div>
            </div>

            <div className="pass grid grid-cols-1 gap-5 mb-5">
              <div className="pass">
                <label htmlFor="password" className="block">Password</label>
                <Passwordinput 
                  onChange={onChange} 
                  placeholder="Password" 
                  value={credentials.password} 
                  name="password" 
                />
              </div>
            </div>



            


            <div className="btn">
              <button type="submit" className="text-black bg-gradient-to-r from-cyan-500 to-blue-500 w-full px-1 py-1 rounded-full">
              <div className='w-full bg-white px-5 py-2 rounded-full hover:bg-transparent hover:text-white'>Login</div></button>
            </div>
          </form>
          <div className='text-md text-center mt-3'>New to LinkedIn? <Link to="/applicant/login" className='text-blue-500 font-semibold'>Signup</Link></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
