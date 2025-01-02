import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const BusBookingUI = () => {
    const [selectedOperator, setSelectedOperator] = useState(null);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [operatorSearch, setOperatorSearch] = useState(""); // State for searching operators
    const [routeSearch, setRouteSearch] = useState(""); // State for searching routes

    const operators = [
        "Dinisuru Super Line",
        "NCG Express",
        "Pasindu Express",
        "Pubudu Power Line",
        "Saliya Super Line",
        "Sandasara Express",
    ];

    const routes = [
        "Makumbura - Badulla",
        "Route 2",
        "Route 3",
    ];

    // Filtered operators and routes based on search input
    const filteredOperators = operators.filter((operator) =>
        operator.toLowerCase().includes(operatorSearch.toLowerCase())
    );

    const filteredRoutes = routes.filter((route) =>
        route.toLowerCase().includes(routeSearch.toLowerCase())
    );

    return (
        <div className="bg-gray-900 min-h-screen p-6 text-white">
            {/* Date Selector */}
            <div className="flex items-center space-x-4 overflow-x-auto pb-3">
                {["02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"].map(
                    (date, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 rounded-lg ${date === "02"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-800 hover:bg-gray-700"
                                }`}
                        >
                            {date}
                        </button>
                    )
                )}
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-6 mt-6">
                {/* Operators */}
                <div className="flex-1">
                    <h3 className="text-lg font-semibold">Operators</h3>
                    <input
                        type="text"
                        placeholder="Search Operator"
                        value={operatorSearch}
                        onChange={(e) => setOperatorSearch(e.target.value)}
                        className="mt-2 w-full bg-gray-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        onChange={(e) => setSelectedOperator(e.target.value)}
                        className="mt-2 w-full bg-gray-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Operator</option>
                        {filteredOperators.map((operator, index) => (
                            <option key={index} value={operator}>
                                {operator}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Routes */}
                <div className="flex-1">
                    <h3 className="text-lg font-semibold">Routes</h3>
                    <input
                        type="text"
                        placeholder="Search Route"
                        value={routeSearch}
                        onChange={(e) => setRouteSearch(e.target.value)}
                        className="mt-2 w-full bg-gray-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        onChange={(e) => setSelectedRoute(e.target.value)}
                        className="mt-2 w-full bg-gray-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Route</option>
                        {filteredRoutes.map((route, index) => (
                            <option key={index} value={route}>
                                {route}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Bus Booking Details */}
            <div className="mt-8 bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-bold">
                    {selectedOperator || "NCG Express"} - Luxury 49 Seater
                </h2>
                <p className="mt-2 text-sm text-gray-400">Route: {selectedRoute || "Makumbura - Badulla"}</p>
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
                    <div className="sm:w-1/2">
                        <p>Departs: Makumbura 10:15 AM</p>
                        <p>Arrives: Badulla 03:00 PM</p>
                        <p>Duration: Approx 4h 30m</p>
                    </div>
                    <div className="sm:w-1/2 text-right mt-4 sm:mt-0">
                        <p className="text-lg font-bold">2,130 LKR</p>
                        <Link
                            to="/seat-selection"
                            className="mt-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        >
                            Book My Seats
                        </Link> {/* Link to SeatSelection page */}
                    </div>
                </div>
                <div className="mt-4 text-red-500">
                    <p>0 seats available</p>
                    <p>Closes in 1:21:30</p>
                </div>
            </div>
        </div>
    );
};

export default BusBookingUI;
