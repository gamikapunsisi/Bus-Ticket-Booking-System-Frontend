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
        "Colombo - Kandy",
        "Gampaha - Matara",
        "Negombo - Galle",
        "Kurunegala - Anuradhapura",
        "Jaffna - Colombo",
    ];

    const busDetails = [
        {
            operator: "NCG Express",
            route: "Makumbura - Badulla",
            departs: "Makumbura 10:15 AM",
            arrives: "Badulla 03:00 PM",
            duration: "Approx 4h 30m",
            price: "2,130 LKR",
            seatsAvailable: "0 seats available",
            closesIn: "Closes in 1:21:30",
        },
        {
            operator: "Dinisuru Super Line",
            route: "Colombo - Kandy",
            departs: "Colombo 07:30 AM",
            arrives: "Kandy 09:30 AM",
            duration: "Approx 2h",
            price: "1,050 LKR",
            seatsAvailable: "10 seats available",
            closesIn: "Closes in 3:15:00",
        },
        {
            operator: "Pasindu Express",
            route: "Gampaha - Matara",
            departs: "Gampaha 06:00 AM",
            arrives: "Matara 10:30 AM",
            duration: "Approx 4h 30m",
            price: "1,850 LKR",
            seatsAvailable: "5 seats available",
            closesIn: "Closes in 2:45:00",
        },
        {
            operator: "Pubudu Power Line",
            route: "Negombo - Galle",
            departs: "Negombo 08:00 AM",
            arrives: "Galle 12:30 PM",
            duration: "Approx 4h 30m",
            price: "1,920 LKR",
            seatsAvailable: "2 seats available",
            closesIn: "Closes in 4:00:00",
        },
        {
            operator: "Saliya Super Line",
            route: "Kurunegala - Anuradhapura",
            departs: "Kurunegala 09:00 AM",
            arrives: "Anuradhapura 12:30 PM",
            duration: "Approx 3h 30m",
            price: "1,780 LKR",
            seatsAvailable: "15 seats available",
            closesIn: "Closes in 2:20:00",
        },
        {
            operator: "Sandasara Express",
            route: "Jaffna - Colombo",
            departs: "Jaffna 06:00 AM",
            arrives: "Colombo 03:00 PM",
            duration: "Approx 9h",
            price: "3,450 LKR",
            seatsAvailable: "8 seats available",
            closesIn: "Closes in 5:45:00",
        },
    ];

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
                        {operators.map((operator, index) => (
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
                        {routes.map((route, index) => (
                            <option key={index} value={route}>
                                {route}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Bus Booking Details */}
            <div className="mt-8">
                {busDetails.map((bus, index) => (
                    <div key={index} className="bg-gray-800 p-6 rounded-lg mb-4">
                        <h2 className="text-xl font-bold">{bus.operator} - Luxury 49 Seater</h2>
                        <p className="mt-2 text-sm text-gray-400">Route: {bus.route}</p>
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
                            <div className="sm:w-1/2">
                                <p>Departs: {bus.departs}</p>
                                <p>Arrives: {bus.arrives}</p>
                                <p>Duration: {bus.duration}</p>
                            </div>
                            <div className="sm:w-1/2 text-right mt-4 sm:mt-0">
                                <p className="text-lg font-bold">{bus.price}</p>
                                <Link
                                    to="/seat-selection"
                                    className="mt-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                >
                                    Book My Seats
                                </Link>
                            </div>
                        </div>
                        <div className="mt-4 text-red-500">
                            <p>{bus.seatsAvailable}</p>
                            <p>{bus.closesIn}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BusBookingUI;
