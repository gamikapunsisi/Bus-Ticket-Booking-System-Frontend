import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure to install axios

const TripSchedule = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await axios.get('/api/trips'); // Adjust the API endpoint
      
      // Group trips by routeId
      const groupedTrips = response.data.reduce((acc, trip) => {
        if (!acc[trip.routeId]) {
          acc[trip.routeId] = {
            routeId: trip.routeId,
            routeName: trip.route.name, // Assuming route has a name property
            trips: []
          };
        }
        
        // Only add scheduled trips
        if (trip.tripStatus === 'scheduled') {
          acc[trip.routeId].trips.push({
            id: trip.id,
            departureTime: new Date(trip.departureTime).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }),
            arrivalTime: new Date(trip.arrivalTime).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }),
            tripDate: new Date(trip.tripDate).toLocaleDateString(),
            busId: trip.busId
          });
        }
        return acc;
      }, {});

      setTrips(Object.values(groupedTrips));
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch trips');
      setLoading(false);
    }
  };

  const handleTripSelect = (tripDetails) => {
    navigate('/seat-selection', { 
      state: tripDetails
    });
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Trip Schedule</h2>
      <div className="space-y-4">
        {trips.map((routeGroup) => (
          <div 
            key={routeGroup.routeId} 
            className="bg-white rounded-lg shadow-md p-4"
          >
            <h3 className="text-xl font-semibold mb-2">{routeGroup.routeName}</h3>
            <div className="flex flex-wrap gap-2">
              {routeGroup.trips.map((trip) => (
                <button
                  key={trip.id}
                  onClick={() => handleTripSelect({
                    tripId: trip.id,
                    routeId: routeGroup.routeId,
                    routeName: routeGroup.routeName,
                    departureTime: trip.departureTime,
                    arrivalTime: trip.arrivalTime,
                    tripDate: trip.tripDate,
                    busId: trip.busId
                  })}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  <div>{trip.departureTime}</div>
                  <div className="text-xs">to {trip.arrivalTime}</div>
                  <div className="text-xs">{trip.tripDate}</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripSchedule;