import React, { useState, useEffect } from "react";
import Input from "../../components/Form/Input";
import { useInput } from "../../hooks/use-input";
import { isFloatNumber, isNotEmpty } from "../../validation/Validations";
import { GoSync } from "react-icons/go";
import { fetchRoutes, addRoute } from "../../config/api";

const RoadRouteAdd = () => {
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const {
    value: routeName,
    handleInputChange: handleRouteNameChange,
    handleInputBlur: handleRouteNameBlur,
    hasError: routeNameHasError,
    reset: resetRouteName,
  } = useInput("", isNotEmpty);

  const {
    value: routeId,
    handleInputChange: handleRouteIdChange,
    handleInputBlur: handleRouteIdBlur,
    hasError: routeIdHasError,
    reset: resetRouteId,
  } = useInput("", isNotEmpty);

  const {
    value: distance,
    handleInputChange: handleDistanceChange,
    handleInputBlur: handleDistanceBlur,
    hasError: distanceHasError,
    reset: resetDistance,
  } = useInput("", isFloatNumber);

  const {
    value: estimatedTime,
    handleInputChange: handleEstimatedTimeChange,
    handleInputBlur: handleEstimatedTimeBlur,
    hasError: estimatedTimeHasError,
    reset: resetEstimatedTime,
  } = useInput("", isNotEmpty);

  const hasError =
    routeNameHasError ||
    routeIdHasError ||
    distanceHasError ||
    estimatedTimeHasError;

  const hasEmptyFields = !routeName || !routeId || !distance || !estimatedTime;

  // Fetch routes on component mount
  useEffect(() => {
    const loadRoutes = async () => {
      try {
        const data = await fetchRoutes();
        if (Array.isArray(data)) {
          setRoutes(data);  // Store the fetched routes in state if it's an array
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Failed to load routes:', error);
      }
    };
    loadRoutes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hasError || hasEmptyFields) {
      return;
    }

    setLoading(true);

    try {
      const newRoute = { routeId, routeName, distance, estimatedTime };
      const data = await addRoute(newRoute);

      if (data.success) {
        // Add the new route to the state
        setRoutes((prevRoutes) => [
          ...prevRoutes,
          newRoute,
        ]);
        // Reset form fields
        resetRouteName();
        resetRouteId();
        resetDistance();
        resetEstimatedTime();
        setShowForm(false); // Hide the form after submission
      } else {
        alert(data.message || "Failed to add route.");
      }
    } catch (err) {
      console.error("Error adding route:", err);
      alert("Failed to add route. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans">
      <h1 className="mb-4 text-xl font-bold">Road Routes</h1>
      <button
        className="px-4 py-2 mb-4 text-white bg-green-500 rounded-md"
        onClick={() => setShowForm((prev) => !prev)}
      >
        {showForm ? "Cancel" : "Add New Route"}
      </button>

      {/* Form for adding route */}
      {showForm && (
        <div className="mb-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <Input
                id="routeId"
                name="routeId"
                type="text"
                placeholder="Ex: 22-2 (kandy - Ampara route code)"
                label="Route ID"
                value={routeId}
                onChange={handleRouteIdChange}
                onBlur={handleRouteIdBlur}
                error={routeIdHasError && "Please enter valid route id"}
              />
              <Input
                id="routeName"
                name="routeName"
                type="text"
                placeholder="Ex: Kandy - Colombo"
                label="Route Name"
                value={routeName}
                onChange={handleRouteNameChange}
                onBlur={handleRouteNameBlur}
                error={routeNameHasError && "Please enter valid route name"}
              />
              <Input
                id="distance"
                name="distance"
                type="number"
                placeholder="Ex: Enter distance in kilometers (e.g., 54.3)"
                label="Distance"
                value={distance}
                onChange={handleDistanceChange}
                onBlur={handleDistanceBlur}
                error={distanceHasError && "Please enter valid distance"}
              />
              <Input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                placeholder="Ex: 5h 30m"
                label="Estimated Time"
                value={estimatedTime}
                onChange={handleEstimatedTimeChange}
                onBlur={handleEstimatedTimeBlur}
                error={estimatedTimeHasError && "Please enter valid estimated time"}
              />
            </div>

            <button
              disabled={hasError || hasEmptyFields}
              className={`mt-4 bg-blue-500 text-white w-32 h-10 flex items-center justify-center rounded-md ${hasError || hasEmptyFields ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
              type="submit"
            >
              {loading ? <GoSync className="animate-spin" /> : "Add Route"}
            </button>
          </form>
        </div>
      )}

      {/* Display the list of routes */}
      <table className="w-full mt-4 border border-collapse border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border border-gray-300">Route ID</th>
            <th className="px-4 py-2 border border-gray-300">Route Name</th>
            <th className="px-4 py-2 border border-gray-300">Distance</th>
            <th className="px-4 py-2 border border-gray-300">Estimated Time</th>
          </tr>
        </thead>
        <tbody>
          {routes && routes.length > 0 ? (
            routes.map((route, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border border-gray-300">{route.routeId}</td>
                <td className="px-4 py-2 border border-gray-300">{route.routeName}</td>
                <td className="px-4 py-2 border border-gray-300">{route.distance} km</td>
                <td className="px-4 py-2 border border-gray-300">{route.estimatedTime}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-4 py-2 text-center border">No routes available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RoadRouteAdd;
