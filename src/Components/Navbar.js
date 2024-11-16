import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    
    setIsLoggedIn(false); 
  };

  return (
    <>
      <div className="nav flex justify-between p-5 bg-white items-center top-0 z-10 sticky">
        <div className="logo text-4xl font-extrabold text-slate-800 bg-clip-text">HireNEST</div>

        {/* Hamburger menu button for smaller screens */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-blue-500 focus:outline-none">
            {/* Add your hamburger icon here */}
          </button>
        </div>

        {/* Navbar links */}
        <div className={`text-white links flex lg:flex list-none gap-5 lg:gap-[2.3vw] items-center ${isOpen ? 'block' : 'hidden'} lg:block`}>
          {isLoggedIn ? ( // Conditional rendering based on login status
            <>
              <li>
                <button 
                  onClick={handleLogout}
                  className="text-black bg-gradient-to-r from-cyan-500 to-blue-500 px-1 py-4 rounded-full"
                >
                  <span className='bg-white px-5 py-3 rounded-full hover:bg-transparent hover:text-white'>Logout</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-black bg-gradient-to-r from-cyan-500 to-blue-500 px-1 py-4 rounded-full">
                  <span className='bg-white px-5 py-3 rounded-full hover:bg-transparent hover:text-white'>Login</span>
                </Link>
              </li>
              <li>
                <Link to="/chooseOptions" className="block bg-black px-5 py-4 rounded-full transform transition-transform duration-150 hover:scale-110">
                  Get Started
                </Link>
              </li>
            </>
          )}
        </div>
      </div>

      {/* Search input for mobile screens */}
      {isOpen && (
        <div className="search lg:hidden p-4">
          <input
            type="search"
            className="w-full h-[35px] rounded-lg p-2 text-gray-800"
            placeholder="Search..."
          />
        </div>
      )}
    </>
  );
}

export default Navbar;
