import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Route {
  routeName: string;
  stops: string[];
}

const TripCreator = () => {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [driverName, setDriverName] = useState('');
  const [conductorName, setConductorName] = useState('');
  const [tripDate, setTripDate] = useState('');
  const [tripTime, setTripTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${baseUrl}/api/bus/routes`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (response.ok) {
        const routesData = data.routes || data;
        setRoutes(routesData);
        setError('');
      } else {
        setError('Failed to fetch routes');
      }
    } catch (err) {
      setError('Error loading routes');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!selectedRoute || !driverName || !conductorName || !tripDate || !tripTime) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      const baseUrl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Authentication required');
        setLoading(false);
        return;
      }

      const tripDateTime = new Date(`${tripDate}T${tripTime}`);
      
      const tripData = {
        tripId: `TRIP-${Date.now()}`,
        busRoute: selectedRoute,
        driverName: driverName,
        conductorName: conductorName,
        tripDate: tripDateTime
      };

      console.log('Attempting to create trip with data:', tripData);
      console.log('API URL:', `${baseUrl}/api/bus/trips`);
      console.log('Token exists:', !!token);

      const response = await fetch(`${baseUrl}/api/bus/trips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(tripData)
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.log('Response is not JSON:', responseText);
      }

      if (response.ok) {
        console.log('Trip created successfully:', data);
        setError('✅ Trip created successfully');
        alert('Trip created successfully!');
        navigate('/admin/dashboard');
      } else {
        switch (response.status) {
          case 400:
            setError(`❌ Bad Request: ${data?.message || 'Invalid trip data'}`);
            break;
          case 401:
            setError('❌ Unauthorized: Please log in again');
            navigate('/login');
            break;
          case 403:
            setError('❌ Forbidden: You do not have permission to create trips');
            break;
          case 409:
            setError('❌ Conflict: Trip already exists');
            break;
          case 422:
            setError(`❌ Validation Error: ${data?.message || 'Invalid data format'}`);
            break;
          case 500:
            setError('❌ Server Error: Please try again later');
            break;
          default:
            setError(`❌ Error: ${data?.message || 'Failed to create trip'}`);
        }
        console.error('Failed to create trip:', {
          status: response.status,
          data: data
        });
      }
    } catch (err) {
      console.error('Error in trip creation:', err);
      setError(`❌ Network Error: ${err instanceof Error ? err.message : 'Failed to create trip'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg">
        <div className="px-8 py-6 border-b border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900">Schedule New Trip</h2>
          <p className="mt-2 text-sm text-gray-600">Create a new bus trip by filling in the details below</p>
        </div>

        {error && (
          <div className="px-8 py-4">
            <div className={`p-4 rounded-md ${
              error.startsWith('✅') ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'
            }`}>
              <p className={`text-sm ${
                error.startsWith('✅') ? 'text-green-700' : 'text-red-700'
              }`}>{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Route *</label>
              <select
                value={selectedRoute}
                onChange={(e) => setSelectedRoute(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a route</option>
                {routes.map((route) => (
                  <option key={route.routeName} value={route.routeName}>
                    {route.routeName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Driver Name *</label>
              <input
                type="text"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Conductor Name *</label>
              <input
                type="text"
                value={conductorName}
                onChange={(e) => setConductorName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trip Date *</label>
              <input
                type="date"
                value={tripDate}
                onChange={(e) => setTripDate(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trip Time *</label>
              <input
                type="time"
                value={tripTime}
                onChange={(e) => setTripTime(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 text-sm font-medium text-white rounded-lg ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                'Create Trip'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TripCreator; 