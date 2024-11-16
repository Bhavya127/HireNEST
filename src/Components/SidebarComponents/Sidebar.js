import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faUser, faBriefcase } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  const links = [
    { to: '/Account', label: 'Profile', icon: faUser },
    { to: '/Applications', label: 'Applications', icon: faBriefcase },
    { to: '/VideoChat', label: 'HireNEST', icon: faVideo },
    { to: '/VideoChat', label: 'HireNEST', icon: faVideo },
    { to: '/VideoChat', label: 'HireNEST', icon: faVideo },
  ];

  return (
    <div className="flex place-content-end">
      <div className="mt-10 flex flex-col  w-64 shadow-lg">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={({ isActive }) =>
              `flex w-full p-4 my-1 text-lg rounded-xl 
              ${isActive ? 'bg-cyan-600 text-white' : 'text-gray-700 hover:bg-cyan-100 hover:text-cyan-600'}`
            }
          >
            <FontAwesomeIcon icon={link.icon} className="mr-3" />
            <span className="font-semibold">{link.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
