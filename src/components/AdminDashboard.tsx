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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bus/trips`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 403) {
        setError('Access denied. Admin privileges required.');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch trips');
      }

      const data = await response.json();
      setTrips(data.trips);
    } catch (err) {
      setError('Failed to fetch trips');
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
      const response = await fetch(`http://localhost:3000/api/bus/trips/${tripId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 403) {
        setError('Access denied. Admin privileges required.');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to delete trip');
      }

      setTrips(trips.filter(trip => trip.trip_id !== tripId));
    } catch (err) {
      setError('Failed to delete trip');
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
                      <h3 className="text-lg font-semibold text-gray-900">{trip.busRoute}</h3>
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
                      <p>Driver: {trip.driverName}</p>
                      <p>Conductor: {trip.conductorName}</p>
                      <p>Date: {new Date(trip.tripDate).toLocaleString()}</p>
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
                        <button onClick={() => handleDeleteRoute(route.route_id)} className="text-red-600 hover:text-red-800">
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