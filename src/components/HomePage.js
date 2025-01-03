import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Assuming React Router is used for navigation

const HomePage = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRoute, setSelectedRoute] = useState(null);
  const navigate = useNavigate(); // Hook to navigate between pages

  // Fetch routes from the backend API
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/routes"); // Backend URL
        setRoutes(response.data.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch routes. Please try again.");
        setLoading(false);
      }
    };
    fetchRoutes();
  }, []);

  // Handle dropdown selection change
  const handleRouteChange = (e) => {
    const routeId = e.target.value;
    const route = routes.find((r) => r.routeId === routeId);
    setSelectedRoute(route);
  };

  // Handle Booking button click
  const handleBookingClick = () => {
    if (selectedRoute) {
      navigate("/seat-selection", { state: { route: selectedRoute } });
    } else {
      setError("Please select a route before proceeding.");
    }
  };

  return (
    <div>
      {/* Header Section */}
      <header
        className="bg-cover bg-center h-screen text-white flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/images/bus2.png')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* Search Section */}
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-6xl font-bold mb-6">Online Seat Reservation</h2>
          <div className="bg-gray-100/80 p-8 rounded-lg shadow-md backdrop-blur-sm">
            {/* Show loading or error state */}
            {loading ? (
              <p>Loading routes...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <form className="flex flex-col items-center justify-center gap-4">
                {/* Route Dropdown */}
                <select
                  className="w-full md:w-1/4 p-3 border border-gray-300 rounded text-black"
                  value={selectedRoute ? selectedRoute.routeId : ""}
                  onChange={handleRouteChange}
                >
                  <option value="">Select Route</option>
                  {routes.map((route) => (
                    <option key={route.routeId} value={route.routeId}>
                      {route.routeName}
                    </option>
                  ))}
                </select>
                {/* Display selected route details */}
                {selectedRoute && (
                  <div className="mt-4 text-center">
                    <h3 className="text-xl font-bold text-blue-600">{selectedRoute.routeName}</h3>
                    <p className="mt-2 text-gray-700">
                      Distance: {selectedRoute.distance} km
                    </p>
                    <p className="text-gray-700">Estimated Time: {selectedRoute.estimatedTime}</p>
                  </div>
                )}
                {/* Booking Button */}
                <button
                  type="button"
                  onClick={handleBookingClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
                >
                  Booking
                </button>
              </form>
            )}
          </div>
        </div>
      </header>

      {/* Featured Routes */}
      <section id="routes" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Popular Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {routes.length === 0 ? (
              <p>No routes available</p>
            ) : (
              routes.map((route, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded shadow hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-bold text-blue-600">{route.routeName}</h3>
                  <p className="mt-2 text-gray-700">Starting from Rs:1000</p>
                  <button
                    onClick={() => {
                      setSelectedRoute(route);
                      navigate("/seat-selection", { state: { route } });
                    }}
                    className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Book Now
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
