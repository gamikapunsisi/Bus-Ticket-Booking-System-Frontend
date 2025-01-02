// src/routes/routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../components/AdminDashboard';
import AddRoute from '../components/AddRoute';
import AddBus from '../components/AddBus';
import AddSchedule from '../components/AddSchedule';
import UserDashboard from '../components/UserDashboard';
import ViewBuses from '../components/ViewBuses';
import ViewRoutes from '../components/ViewRoute';
import Signup from '../components/Signup';



const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/signup" element={<Signup />} />
      
      {/* Admin routes */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/add-route" element={<AddRoute />} />
      <Route path="/add-bus" element={<AddBus />} />
      <Route path="/add-schedule" element={<AddSchedule />} />

      {/* User routes */}
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/view-buses" element={<ViewBuses />} />
      <Route path="/view-routes" element={<ViewRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
