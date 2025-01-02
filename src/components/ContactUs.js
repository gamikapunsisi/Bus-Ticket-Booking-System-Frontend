// src/components/AboutUs.js

import React from 'react';

const AboutUs = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-lg">
        Welcome to Book My Seat! We are dedicated to providing a seamless and
        convenient way to book your bus seats online. Our platform offers a
        simple, user-friendly interface for booking your seat on various buses
        across different locations. With our service, you can easily check
        schedules, choose seats, and make payments online, ensuring a smooth
        experience for all your travel needs.
      </p>
      <h2 className="text-2xl font-semibold mt-6">Our Mission</h2>
      <p className="text-lg">
        Our mission is to make bus travel hassle-free and efficient, providing
        customers with the ability to book seats quickly and securely. We aim to
        improve the travel experience by offering innovative solutions and
        excellent customer service.
      </p>
      <h2 className="text-2xl font-semibold mt-6">Contact Us</h2>
      <p className="text-lg">
        If you have any questions or need help with your booking, feel free to
        contact our support team. We are here to assist you!
      </p>
    </div>
  );
};

export default AboutUs;
