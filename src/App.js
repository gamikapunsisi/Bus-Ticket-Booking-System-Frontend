import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRoutes from './routes/routes'; // Import the routes file
import HomePage from './components/HomePage'; // Import the HomePage component
import Login from './components/Login'; // Import the Login component
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Signup from './components/Signup';
import BookingPage from "./pages/BookingPage";
import SeatSelection from './components/SeatSelection'; // Import SeatSelection component
import ContactUs from './components/ContactUs';
import Footer from './components/ Footer';

function App() {
  const [userRole, setUserRole] = useState(null); // Tracks logged-in role

  const login = (role) => {
    setUserRole(role); // Set the logged-in role
  };

  const logout = () => {
    setUserRole(null); // Clear the role upon logout
  };

  return (
    <Router>
      {/* Add Navbar here */}
      <Navbar />
      
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage />} />

        <Route path="/booking" element={<BookingPage />} />

        {/* Login and Signup Routes */}
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/signup" element={<Signup />} />

        {/* Role-Based Dashboards
        <Route
          path="/admin-dashboard"
          element={userRole === 'admin' ? <AdminDashboard onLogout={logout} /> : <Navigate to="/" />}
        />
        <Route
          path="/user-dashboard"
          element={userRole === 'user' ? <UserDashboard onLogout={logout} /> : <Navigate to="/" />}
        /> */}

       {/* Seat Selection Route */}
       <Route
          path="/seat-selection"
          element={<SeatSelection />} // Ensure this is the correct component
        />

      <Route path="/contact" element={<ContactUs />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />


        {/* All routes handled within AppRoutes */}
        <Route path="/*" element={userRole ? <AppRoutes /> : <Navigate to="/login" />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;
