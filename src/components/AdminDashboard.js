// src/components/AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = ({ onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <nav className="w-full bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <img src="/logo.png" alt="Logo" className="h-10" />
            </div>
            <div className="flex space-x-6">
              <Link to="/admin_dashboard" className="text-lg text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <Link to="/reservations" className="text-lg text-gray-700 hover:text-blue-600">
                Reservations
              </Link>
              <Link to="/all_users" className="text-lg text-gray-700 hover:text-blue-600">
                Users
              </Link>
              <button
                onClick={onLogout}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <h1 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Link
            to="/add-route"
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-800">Add Route</h3>
            <p className="text-sm text-gray-600 mt-2">Manage and add new bus routes.</p>
          </Link>
          <Link
            to="/add-bus"
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-800">Add Bus</h3>
            <p className="text-sm text-gray-600 mt-2">Add new buses to the system.</p>
          </Link>
          <Link
            to="/add-schedule"
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-800">Add Schedule</h3>
            <p className="text-sm text-gray-600 mt-2">Create and update bus schedules.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
