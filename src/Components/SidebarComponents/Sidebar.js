import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faUser, faBriefcase } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  const links = [
    { to: '/Account', label: 'Profile', icon: faUser },
    { to: '/Applications', label: 'Applications', icon: faBriefcase },
    { to: '/VideoChat', label: 'HireNEST', icon: faVideo },
  ];

  return (
    <div className="flex flex-col items-start mt-10 w-64 shadow-lg bg-white rounded-lg p-5 h-screen">
      {links.map((link, index) => (
        <NavLink
          key={index}
          to={link.to}
          aria-label={link.label}
          className={({ isActive }) =>
            `flex items-center w-full p-4 my-2 text-lg font-semibold rounded-xl transition-all ease-in-out 
            ${isActive ? 'bg-cyan-600 text-white' : 'text-gray-700 hover:bg-cyan-100 hover:text-cyan-600'}`
          }
        >
          <FontAwesomeIcon icon={link.icon} className="mr-4 text-xl" />
          <span>{link.label}</span>
        </NavLink>
      ))}
    </div>
  );
}

export default Sidebar;
