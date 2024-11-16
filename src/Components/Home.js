import React from 'react';
import { Link } from 'react-router-dom';
import videoConferencing from "./Images/video-conferencing.jpg";
import JobFilter from "./Images/Job filter.png";
import ConnectPeople from "./Images/ConnectPeople.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Home = () => {
  return (
    <div>
      <div className='h-auto flex items-center justify-center mt-36 '>
        <div className='flex flex-col items-center text-center'>
          <div className="flex text-[4rem]">
            Find your dream job
          </div>
          <div className="text-[4rem] font-bold mb-8 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            <span className='text-black text-4xl font-medium'>
              with
            </span> HireNEST
          </div>

          <div className="search w-96">
            <input
              type="search"
              className="w-full rounded-full p-4 text-white bg-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>






      <div className='part2 text-4xl p-5 mt-52 text-center mb-3'>
        <span className='font-semibold'>Advanced Search Filters :</span> Filters job by location , industry and experience.
      </div>
      <div className='flex p-10 place-content-center gap-6'>
        <div className='text-gray-600 font-semibold text-3xl w-96 text-right my-auto'>
          Advanced Search Filters Filters job by location , industry and experience.
          Get connected to people with same Interests.
        </div>
        <div className="w-fit p-5 ">
          <img src={JobFilter} alt='kdfnbkd' className='h-[35] w-[40rem] rounded-md ' />
        </div>
      </div>






      <div className='p-5'>
        <div className='part2 text-4xl mt-20 text-center mb-10 font-semibold'>
          Get connected to people with same Interests.
        </div>

        <div className='flex  flex-col items-center'>

          <div>
            <img src={ConnectPeople} alt='kdfnbkd' className='h-96 rounded-md' />
          </div>
          <div className='text-gray-600 font-semibold text-3xl mt-10 text-center'>
            Find your friends , colleaeges, mentors and recruiters based <br />on your profile as well as interests.
          </div>
        </div>
      </div>







      <div className='part3 text-4xl p-5 mt-20'>
        <span className='font-bold text-4xl'>For Recruiters: </span>Connect with HireConnect.
        <div className='flex mt-20 gap-7'>
          <div>
            <img src={videoConferencing} alt='kdfnbkd' className='h-96 rounded-md' />
          </div>
          <div className='part3 text-3xl my-auto text-gray-600 font-semibold'>
            <span className='text-cyan-500'>Meet </span><span className='font-bold text-4xl bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent'>HireConnect </span> <br /> Our own inbuilt Feature purposely designed to <br />conduct personal interviews <br />and online Video Conferences.
          </div>
        </div>
      </div>



      <div className='bg-black text-white mt-40 py-10 '>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col md:flex-row justify-between'>
            <div className='mb-6 md:mb-0'>
              <div className='text-2xl font-semibold mb-4'>HireNEST</div>
              <p className='mb-4'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
              </p>
              <div className='flex space-x-4'>
                <a href='https://facebook.com' className='text-blue-600 hover:text-blue-400'>
                  <FontAwesomeIcon icon={faFacebook} className='h-6 w-6' />
                </a>
                <a href='https://twitter.com' className='text-blue-400 hover:text-blue-300'>
                  <FontAwesomeIcon icon={faTwitter} className='h-6 w-6' />
                </a>
                <a href='https://linkedin.com' className='text-blue-700 hover:text-blue-500'>
                  <FontAwesomeIcon icon={faLinkedin} className='h-6 w-6' />
                </a>
              </div>
            </div>
            <div>
              <h4 className='text-lg font-semibold mb-4'>Quick Links</h4>
              <ul className='space-y-2'>
                <li><Link to='#' className='hover:text-gray-400'>Home</Link></li>
                <li><Link to='#' className='hover:text-gray-400'>About Us</Link></li>
                <li><Link to='#' className='hover:text-gray-400'>Services</Link></li>
                <li><Link to='#' className='hover:text-gray-400'>Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className='text-lg font-semibold mb-4'>Contact Us</h4>
              <p className='mb-2'>123 Main Street, Suite 500</p>
              <p className='mb-2'>City, State, ZIP</p>
              <p className='mb-2'>Email: contact@hirenest.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
          </div>
          <div className='text-center mt-10 border-t border-gray-700 pt-4'>
            <p>&copy; 2024 HireNEST. All rights reserved.</p>
            <div className='flex justify-center gap-4'>
              <Link to='#' className='text-blue-500'>Privacy Policy</Link>
              <Link to='#' className='text-blue-500'>Terms of Service</Link>
              <Link to='#' className='text-blue-500'>Contact Us</Link>
            </div>
          </div>
        </div>
      </div>




    </div>


  );
}

export default Home;
