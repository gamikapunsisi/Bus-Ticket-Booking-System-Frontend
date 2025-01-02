// src/components/ViewBuses.js
import React, { useState, useEffect } from 'react';

const ViewBuses = () => {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    // Sample data, replace it with API call to get buses
    setBuses([
      { id: 1, name: 'Bus 1', type: 'Luxury', availableSeats: 20 },
      { id: 2, name: 'Bus 2', type: 'Standard', availableSeats: 15 },
      { id: 3, name: 'Bus 3', type: 'Economy', availableSeats: 30 },
    ]);
  }, []);

  return (
    <div>
      <h1>Available Buses</h1>
      <table>
        <thead>
          <tr>
            <th>Bus Name</th>
            <th>Bus Type</th>
            <th>Available Seats</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus) => (
            <tr key={bus.id}>
              <td>{bus.name}</td>
              <td>{bus.type}</td>
              <td>{bus.availableSeats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBuses;
