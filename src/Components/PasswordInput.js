import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Passwordinput({ value, onChange, placeholder, name }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="relative">
      <input
        type={passwordVisible ? "text" : "password"}
        className="rounded-md p-2 w-full border border-gray-300"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
      <span
        onClick={togglePasswordVisibility}
        className="absolute right-3 top-3 cursor-pointer"
      >
        <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
      </span>
    </div>
  );
}

export default Passwordinput;
