import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <div className="bg-light-neutral-100 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-light-neutral-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300"
        >
          <img src={logo} alt="Movie App Logo" className='w-20 p-0 m-0' />
        </Link>

        <div className="flex justify-end space-x-4">
          <Link
            to="/login"
            className="bg-emerald-400 text-neutral-50 px-4 py-3 rounded-xl hover:bg-emerald-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-red-400 text-neutral-50 px-4 py-3 rounded-xl hover:bg-red-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            onClick
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
