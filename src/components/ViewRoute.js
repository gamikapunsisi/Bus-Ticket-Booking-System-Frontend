// src/components/ViewRoutes.js
import React, { useState, useEffect } from 'react';

const ViewRoutes = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    // Sample data, replace it with API call to get routes
    setRoutes([
      { id: 1, from: 'City A', to: 'City B', distance: '200 km' },
      { id: 2, from: 'City B', to: 'City C', distance: '150 km' },
      { id: 3, from: 'City C', to: 'City D', distance: '250 km' },
    ]);
  }, []);

  return (
    <div>
      <h1>Available Routes</h1>
      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Distance</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route) => (
            <tr key={route.id}>
              <td>{route.from}</td>
              <td>{route.to}</td>
              <td>{route.distance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewRoutes;
