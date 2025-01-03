// src/components/AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlinePlus, AiOutlineUser, AiOutlineSchedule } from 'react-icons/ai';
import { MdOutlineDashboard } from 'react-icons/md';

const AdminDashboard = ({ onLogout }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      {/* <nav className="w-full bg-gradient-to-r from-white to-gray-100 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <img src="/logo.png" alt="Logo" className="h-12" />
              <span className="text-2xl font-bold text-indigo-700">Admin Dashboard</span>
            </div>
            <div className="flex space-x-6 items-center">
              <Link
                to="/admin_dashboard"
                className="text-lg text-gray-700 hover:text-indigo-600 flex items-center font-medium"
              >
                <MdOutlineDashboard className="mr-2" /> Dashboard
              </Link>
              <Link
                to="/reservations"
                className="text-lg text-gray-700 hover:text-indigo-600 flex items-center font-medium"
              >
                <AiOutlineSchedule className="mr-2" /> Reservations
              </Link>
              <Link
                to="/all_users"
                className="text-lg text-gray-700 hover:text-indigo-600 flex items-center font-medium"
              >
                <AiOutlineUser className="mr-2" /> Users
              </Link>
              <button
                onClick={onLogout}
                className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition shadow-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav> */}

      {/* Content */}
      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* <h1 className="text-5xl font-extrabold text-gray-800 mb-8 text-center">
          Welcome, Admin
        </h1> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link
            to="/add-route"
            className="block p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 border-t-4 border-indigo-500"
          >
            <div className="flex items-center space-x-4">
              <AiOutlinePlus className="text-5xl text-indigo-500" />
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Add Route</h3>
                <p className="text-sm text-gray-600 mt-2">Manage and add new bus routes effortlessly.</p>
              </div>
            </div>
          </Link>
          <Link
            to="/add-bus"
            className="block p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 border-t-4 border-green-500"
          >
            <div className="flex items-center space-x-4">
              <AiOutlinePlus className="text-5xl text-green-500" />
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Add Bus</h3>
                <p className="text-sm text-gray-600 mt-2">Add new buses to the system with ease.</p>
              </div>
            </div>
          </Link>
          <Link
            to="/add-schedule"
            className="block p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 border-t-4 border-purple-500"
          >
            <div className="flex items-center space-x-4">
              <AiOutlineSchedule className="text-5xl text-purple-500" />
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Add Schedule</h3>
                <p className="text-sm text-gray-600 mt-2">Create and update schedules seamlessly.</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
