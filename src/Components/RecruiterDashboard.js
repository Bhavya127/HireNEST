import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faUser, faCircleArrowLeft, faCircleArrowRight,faBriefcase} from '@fortawesome/free-solid-svg-icons';

export default function RecruiterDashbaord({ variant = "symbolic" }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { to: '/Recruiter/Info', icon: faUser, label: 'Profile' },
    { to: '/recruiter/Postjob', icon: faBriefcase, label: 'Post a Job' },
    { to: '/Recruiter/Applications', icon: faBriefcase, label: 'JobsPosted' },
    { to: '/VideoChat', icon: faVideo, label: 'HireNEST' },
    { to: '/VideoChat', icon: faVideo, label: 'HireNEST' },
  ];

  return (
    
    <div className="flex justify-end">
      <div className={`flex flex-col ${isOpen ? 'w-48' : 'w-16'} transition-all duration-300 h-full`}>
       

        <div className="flex flex-col mt-3 w-full bg-black rounded-2xl">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`flex items-center ${isOpen ? 'justify-start' : 'justify-center'} h-12 w-12 md:h-16 md:w-full rounded-md hover:bg-cyan-100 hover:text-cyan-600 transition-colors duration-200 text-slate-50`}
            >
              <FontAwesomeIcon icon={item.icon} className={`${isOpen ? 'ml-5 text-lg' :''}`}/>
              {isOpen && (
                <span className="ml-3 text-sm font-medium text-left">
                  {item.label}
                </span>
              )}
            </Link>
            
          ))}
           <button
          onClick={toggleSidebar}
          className="self-end mt-4 mr-2 p-2 text-cyan-600 text-xl"
        >
          <FontAwesomeIcon icon={isOpen ? faCircleArrowRight : faCircleArrowLeft} />
        </button>
        </div>
      </div>
    </div>
  );
}
