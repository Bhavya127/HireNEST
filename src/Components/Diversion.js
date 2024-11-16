import React from 'react';
import { Link } from 'react-router-dom';

function Diversion() {
    return (
        <div className='flex flex-col justify-center items-center h-[80vh]'>
            {/* Header Section */}
            <div className='text-center mb-8'>
                <h1 className='text-4xl font-bold text-gray-800 mb-4'>Welcome to Hirenest!</h1>
                <p className='text-lg text-gray-600'>Choose your role and get started:</p>
            </div>

            {/* Options Section */}
            <div className='flex flex-col bg-white p-8 rounded-lg shadow-md w-[80%] md:w-[50%] border border-gray-200'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>How would you like to join?</h2>

                {/* Applicant Option */}
                <Link to="/applicant/signup" className='w-full mb-5'>
                    <div className='applicant signup bg-cyan-500 w-full px-5 py-4 text-lg text-white text-center rounded-md font-medium hover:bg-cyan-600 transition-all'>
                        Apply for Jobs
                    </div>
                </Link>

                {/* Recruiter Option */}
                <Link to="/recruiter/signup" className='w-full'>
                    <div className='recruiter signup bg-cyan-500 w-full px-5 py-4 text-lg text-white text-center rounded-md font-medium hover:bg-cyan-600 transition-all'>
                        Start as Recruiter
                    </div>
                </Link>
            </div>

            {/* Footer Section */}
            <div className='text-gray-500 text-sm mt-8'>
                <p>Find your dream job or the perfect candidate—quickly and easily!</p>
            </div>
        </div>
    );
}

export default Diversion;
