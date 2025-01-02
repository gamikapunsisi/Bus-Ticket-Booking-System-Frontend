// src/components/UserDashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BusFront, MapPin, Search, Clock, Calendar, ArrowRight, ChevronDown } from 'lucide-react';

const UserDashboard = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // State for dropdowns
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  // Get unique locations from routes
  const [locations, setLocations] = useState([]);

  // Fetch routes from backend
  useEffect(() => {
    const fetchRoutes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5001/api/routes');
        if (!response.ok) {
          throw new Error('Failed to fetch routes');
        }
        const data = await response.json();
        setRoutes(data.data);
        
        // Extract unique locations
        const uniqueLocations = [...new Set([
          ...data.data.map(route => route.from),
          ...data.data.map(route => route.to)
        ])].sort();
        setLocations(uniqueLocations);
      } catch (err) {
        setError('Failed to fetch routes: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  // Filter routes based on selected locations
  const filteredRoutes = routes.filter(route => {
    if (!fromLocation && !toLocation) return true;
    if (fromLocation && !toLocation) return route.from === fromLocation;
    if (!fromLocation && toLocation) return route.to === toLocation;
    return route.from === fromLocation && route.to === toLocation;
  });

  // Handle search
  const handleSearch = () => {
    if (fromLocation && toLocation) {
      const matchedRoute = routes.find(
        route => route.from === fromLocation && route.to === toLocation
      );
      if (matchedRoute) {
        setSelectedRoute(matchedRoute.id);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to Bus Booking System</h1>
          <p className="text-xl text-blue-100">Find and book your bus tickets easily</p>
        </div>
      </div>

      {/* Search Section with Dropdowns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* From Location Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onClick={() => setShowFromDropdown(!showFromDropdown)}
                >
                  <div className="flex items-center justify-between">
                    <span className={fromLocation ? "text-gray-900" : "text-gray-500"}>
                      {fromLocation || "Select departure location"}
                    </span>
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                </button>
                
                {showFromDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto">
                    {locations.map(location => (
                      <div
                        key={location}
                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors"
                        onClick={() => {
                          setFromLocation(location);
                          setShowFromDropdown(false);
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-900">{location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* To Location Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onClick={() => setShowToDropdown(!showToDropdown)}
                >
                  <div className="flex items-center justify-between">
                    <span className={toLocation ? "text-gray-900" : "text-gray-500"}>
                      {toLocation || "Select destination location"}
                    </span>
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                </button>
                
                {showToDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto">
                    {locations.map(location => (
                      <div
                        key={location}
                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors"
                        onClick={() => {
                          setToLocation(location);
                          setShowToDropdown(false);
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-900">{location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full bg-blue-600 text-white rounded-lg px-4 py-3 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
              >
                <Search className="h-5 w-5 mr-2" />
                Search Routes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading and Error States */}
      {isLoading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading routes...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Routes Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredRoutes.map(route => (
            <div key={route.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">{route.name}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedRoute(selectedRoute === route.id ? null : route.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {selectedRoute === route.id ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Multiple departures daily</span>
                  </div>
                  <span className="text-green-600 font-medium">From Rs. 450</span>
                </div>
              </div>

              {/* Schedule Details */}
              {selectedRoute === route.id && (
                <div className="bg-gray-50 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Available Schedules</h3>
                  <div className="space-y-4">
                    {route.schedules.map(schedule => (
                      <div key={schedule.id} className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <BusFront className="h-5 w-5 text-blue-600" />
                              <span className="font-medium">{schedule.busNo}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span>{schedule.time} - {schedule.arrival}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="font-medium text-green-600">{schedule.price}</span>
                            <Link
                              to={`/booking/${route.id}/${schedule.id}`}
                              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Book Now
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            to="/view-bookings"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Calendar className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">My Bookings</h3>
            <p className="text-gray-600">View and manage your bookings</p>
          </Link>

          <Link 
            to="/schedules"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Clock className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Bus Schedules</h3>
            <p className="text-gray-600">View all available bus schedules</p>
          </Link>

          <Link 
            to="/help"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <MapPin className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Help Center</h3>
            <p className="text-gray-600">Get help with your bookings</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
