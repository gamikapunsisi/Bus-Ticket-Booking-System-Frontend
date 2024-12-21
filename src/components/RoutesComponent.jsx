import { useState, useEffect } from 'react';
import axios from 'axios';

const RoutesComponent = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get('/api/routes');
        if (Array.isArray(response.data)) {
          setRoutes(response.data);
        } else {
          console.error('API did not return an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    fetchRoutes();
  }, []);

  if (!Array.isArray(routes)) {
    return <div>Error: Routes data is invalid.</div>;
  }

  return (
    <div>
      {routes.map(route => (
        <div key={route.id}>{route.name}</div>
      ))}
    </div>
  );
};

export default RoutesComponent;
