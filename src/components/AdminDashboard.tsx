import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { FaPlus, FaEdit, FaTrash, FaEye, FaBus, FaRoute, FaChartLine } from 'react-icons/fa';
import { FaPlus, FaEdit, FaTrash, FaEye, FaBus, FaRoute } from 'react-icons/fa';



interface Trip {
  trip_id: string;
  bus_route: string;
  driver_name: string;
  conductor_name: string;
  trip_date: string;
}

interface Route {
  route_id: string;
  routeName: string;
  stops: string[];
}

const AdminDashboard = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'trips' | 'routes'>('trips');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrips();
  }, []);

  useEffect(() => {
    if (activeTab === 'routes') {
      fetchRoutes();
    }
  }, [activeTab]);

  const fetchTrips = async () => {
    try {
      const token = localStorage.getItem('token');
      const baseUrl = import.meta.env.VITE_API_URL;
      
      if (!token) {
        setError('🔒 No authentication token found');
        return;
      }

      const response = await fetch(`${baseUrl}/api/bus/trips`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log('Raw API Response:', data); // Debug log

      if (response.status === 200) {
        // Handle both array and object responses
        const tripsData = data.trips || data;
        
        const formattedTrips = tripsData.map((trip: any) => {
          console.log('Processing trip:', trip); // Debug log for each trip
          return {
            trip_id: trip._id || trip.trip_id,
            bus_route: trip.bus_route || 'No Route',
            driver_name: trip.driver_name || 'No Driver',
            conductor_name: trip.conductor_name || 'No Conductor',
            // Ensure proper date formatting
            trip_date: trip.trip_date ? new Date(trip.trip_date).toISOString() : new Date().toISOString()
          };
        });

        console.log('Formatted trips:', formattedTrips); // Debug log
        setTrips(formattedTrips);
        setError('✅ Successfully fetched trips (Status: 200)');
      } else if (response.status === 404) {
        setTrips([]);
        setError('ℹ️ No trips found. Please create a new trip.');
      } else {
        throw new Error(`Failed to fetch trips: ${response.status}`);
      }
    } catch (err) {
      console.error('Error in fetchTrips:', err);
      setError(`❌ ${err instanceof Error ? err.message : 'Failed to fetch trips'}`);
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoutes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bus/routes`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch routes');
      }

      const data = await response.json();
      console.log(data);
      // Transform the string array into Route objects
      const formattedRoutes: Route[] = data.routes.map((route: any) => ({
        route_id: route.routeName.toLowerCase().replace(/\s+/g, '-'),
        routeName: route.routeName,
        stops: route.stops
      }));
      setRoutes(formattedRoutes);
    } catch (err) {
      setError('Failed to fetch routes');
    }
  };

  const handleDelete = async (tripId: string) => {
    if (!confirm('Are you sure you want to delete this trip?')) return;

    try {
      const token = localStorage.getItem('token');
      const baseUrl = import.meta.env.VITE_API_URL;
      
      const response = await fetch(`${baseUrl}/api/bus/trips/${tripId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setError('✅ Trip deleted successfully (Status: 200)');
        setTrips(trips.filter(trip => trip.trip_id !== tripId));
      } else if (response.status === 401) {
        setError('🔒 Unauthorized access (Status: 401)');
      } else if (response.status === 403) {
        setError('🚫 Access forbidden (Status: 403)');
      } else if (response.status === 404) {
        setError('❌ Trip not found (Status: 404)');
      } else {
        setError(`❌ Failed to delete trip (Status: ${response.status})`);
      }
    } catch (err) {
      setError('❌ Network error while deleting trip');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
        </div>
        <nav className="mt-6">
          <button
            onClick={() => setActiveTab('trips')}
            className={`w-full flex items-center px-6 py-4 text-gray-700 ${
              activeTab === 'trips' ? 'bg-blue-50 border-r-4 border-blue-500' : ''
            }`}
          >
            <FaBus className="mr-3" />
            <span>Trips</span>
          </button>
          <button
            onClick={() => setActiveTab('routes')}
            className={`w-full flex items-center px-6 py-4 text-gray-700 ${
              activeTab === 'routes' ? 'bg-blue-50 border-r-4 border-blue-500' : ''
            }`}
          >
            <FaRoute className="mr-3" />
            <span>Routes</span>
          </button>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {activeTab === 'trips' ? 'Trip Management' : 'Route Management'}
            </h1>
            <button
              onClick={() => activeTab === 'trips' ? navigate('/trips/create') : navigate('/routes/create')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
            >
              <FaPlus /> New {activeTab === 'trips' ? 'Trip' : 'Route'}
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeTab === 'trips' ? (
                trips.map((trip) => (
                  <div key={trip.trip_id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{trip.bus_route}</h3>
                      <div className="flex gap-2">
                        <button onClick={() => navigate(`/trips/${trip.trip_id}`)} className="text-blue-600 hover:text-blue-800">
                          <FaEye />
                        </button>
                        <button onClick={() => navigate(`/trips/edit/${trip.trip_id}`)} className="text-green-600 hover:text-green-800">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(trip.trip_id)} className="text-red-600 hover:text-red-800">
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Driver:</strong> {trip.driver_name || 'Not assigned'}</p>
                      <p><strong>Conductor:</strong> {trip.conductor_name || 'Not assigned'}</p>
                      <p><strong>Date:</strong> {new Date(trip.trip_date).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })}</p>
                    </div>
                  </div>
                ))
              ) : (
                routes.map((route) => (
                  <div key={route.route_id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{route.routeName}</h3>
                      <div className="flex gap-2">
                        <button onClick={() => navigate(`/routes/edit/${route.route_id}`)} className="text-green-600 hover:text-green-800">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(route.route_id)} className="text-red-600 hover:text-red-800">
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p className="font-medium mb-2">Stops:</p>
                      <p>{route.stops?.join(' → ') || 'No stops defined'}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 