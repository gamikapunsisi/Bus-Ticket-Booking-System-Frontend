import { useState } from 'react';
import { FaMapMarkerAlt, FaExchangeAlt, FaSearch, FaBus, FaClock, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Trip {
  _id: string;
  tripId: string;
  tripDate: string;
}

interface RouteResult {
  route: string;
  stops: string[];
  numberOfStops: number;
  availableTrips: Trip[];
}

const BusRouteFinder = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<RouteResult | null>(null);
  const navigate = useNavigate();

  const handleSwapLocations = () => {
    const temp = startLocation;
    setStartLocation(endLocation);
    setEndLocation(temp);
  };

  const handleSearch = async () => {
    if (!startLocation || !endLocation) {
      setError('Please enter both start and destination locations');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/bus/route/get`, {
        start: startLocation,
        end: endLocation,
        date: selectedDate
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setSearchResult(response.data);
      
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to find route');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = (trip: Trip) => {
    navigate('/seat-selection', {
      state: {
        tripId: trip.tripId,
        tripDate: trip.tripDate,
        selectedSeats: []
      }
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Find Your Route
        </h1>
        
        <div className="relative">
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaMapMarkerAlt className="text-blue-500" />
              </div>
              <input
                type="text"
                placeholder="Enter start location"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
              />
            </div>

            <div className="relative flex justify-center">
              <button
                onClick={handleSwapLocations}
                className="absolute bg-white p-2 rounded-full shadow-lg hover:shadow-xl transform -translate-y-1/2 transition duration-200 hover:scale-110"
              >
                <FaExchangeAlt className="text-blue-500 transform rotate-90" />
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaMapMarkerAlt className="text-red-500" />
              </div>
              <input
                type="text"
                placeholder="Enter destination"
                value={endLocation}
                onChange={(e) => setEndLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
              />
            </div>

            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            disabled={loading}
            className={`w-full mt-8 bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition duration-200 transform hover:scale-[1.02] ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : (
              <FaSearch />
            )}
            <span>{loading ? 'Searching...' : 'Search Routes'}</span>
          </button>

          {error && (
            <div className="mt-4 text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          {searchResult && (
            <div className="mt-8 space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Route Details</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <FaBus className="text-blue-500 text-xl" />
                    <span className="text-gray-700">{searchResult.route}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    {searchResult.stops.map((stop, index) => (
                      <div key={index} className="flex items-center">
                        <span className="text-gray-700">{stop}</span>
                        {index < searchResult.stops.length - 1 && (
                          <FaArrowRight className="mx-2 text-gray-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {searchResult.availableTrips.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Available Trips</h3>
                  {searchResult.availableTrips.map((trip) => (
                    <div
                      key={trip._id}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200"
                    >
                      <div className="flex justify-between items-center">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <FaClock className="text-blue-500" />
                            <span className="text-gray-700">
                              {new Date(trip.tripDate).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                              })}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(trip.tripDate).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                          onClick={() => handleBooking(trip)}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-4">
                  No trips available for the selected date
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusRouteFinder; 