import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShieldHalved} from '@fortawesome/free-solid-svg-icons';

function VerifyEmail() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleChange = (e, index) => {
    const { value } = e.target;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input field if value is not empty and index is less than 5
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all OTP fields are filled
    if (otp.some((val) => val === '')) {
      alert('Please fill all OTP fields.');
      return;
    }

    // Join the OTP array into a single string
    const otpString = otp.join('');
    console.log('Submitting OTP:', otpString); // Debug: Log the OTP value being submitted

    try {
      const response = await fetch('http://localhost:5000/api/auth/verifyotp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          otp: otpString, // Send the entire OTP as a single string
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Handle successful OTP verification (e.g., redirect or show a success message)
        
        navigate("/profile")
      } else {
        // Handle OTP verification failure
        alert(data.message);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('An error occurred while verifying OTP.');
    }
  };

  return (
    <div className='flex place-content-center'>
    <div className="w-fit shadow shodow-lg mt-48 rounded-xl p-5 h-auto">
      <div className='text-center text-3xl font-semibold'>Verify OTP</div>
      <div className='text-center text-3xl font-semibold'><FontAwesomeIcon icon={faShieldHalved}></FontAwesomeIcon></div>
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 p-4">
      <div className="flex gap-2">
        {otp.map((value, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            maxLength="1"
            value={value}
            onChange={(e) => handleChange(e, index)}
            className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        ))}
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Verify
      </button>
      {/* <div className='text-red-500'>Invalid OTP entered</div> */}
    </form>
    </div>
    </div>
  );
}

export default VerifyEmail;
