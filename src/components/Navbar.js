// src/components/Navbar.js

import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-bold">Book My Seat</a>
        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6">
          <li>
            <a href="/" className="hover:text-gray-200">Home</a>
          </li>
          <li>
            <a href="/booking" className="hover:text-gray-200">Book Now</a>
          </li>
          <li>
            <a href="/contact" className="hover:text-gray-200">Contact Us</a>
          </li>
        </ul>
        {/* Mobile Menu */}
        <div className="hidden md:flex gap-4">
          <a href="/login" className="bg-white text-blue-600 py-2 px-4 rounded hover:bg-gray-100">Login</a>
          <a href="/signup" className="bg-gray-200 text-blue-600 py-2 px-4 rounded hover:bg-gray-300">Sign Up</a>
        </div>
        <button className="md:hidden text-white hover:text-gray-200">
          {/* Hamburger Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
