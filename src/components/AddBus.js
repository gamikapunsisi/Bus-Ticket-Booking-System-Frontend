import React, { useState } from "react";
import axios from "axios";
import { Plus } from "react-feather"; // Assuming you're using react-feather for icons

const AddBusForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    busId: "",
    busName: "",
    busType: "Standard",
    busOwner: "",
    busOwnerNIC: "",
    busOwnerContact: "",
    busOwnerEmail: "",
    busOwnerAddress: "",
    routeId: "",
    totalSeats: "",
    seatPositions: [
      { positionName: "Left", numberOfSeatsPerRow: "", numberOfRows: "" },
      { positionName: "Right", numberOfSeatsPerRow: "", numberOfRows: "" },
      { positionName: "Back", numberOfSeatsPerRow: "", numberOfRows: "" },
    ],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSeatChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSeatPositions = [...formData.seatPositions];
    updatedSeatPositions[index][name] = value;
    setFormData({ ...formData, seatPositions: updatedSeatPositions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(""); // Reset error message before submission

    try {
      const response = await axios.post("http://localhost:5001/api/buses", formData);
      console.log("New Bus Added:", response.data);
      onSubmit(response.data); // Pass the added bus data to parent component
    } catch (error) {
      console.error("Error adding bus:", error.response ? error.response.data : error.message);
      setErrorMessage("Error adding bus. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Add New Bus</h1>

      {/* General Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium">Bus ID</label>
          <input
            type="text"
            name="busId"
            value={formData.busId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Bus Name</label>
          <input
            type="text"
            name="busName"
            value={formData.busName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Bus Type</label>
          <select
            name="busType"
            value={formData.busType}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="Standard">Standard</option>
            <option value="Luxury">Luxury</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Total Seats</label>
          <input
            type="number"
            name="totalSeats"
            value={formData.totalSeats}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* Owner Information */}
      <h2 className="text-lg font-semibold text-gray-700">Owner Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium">Owner Name</label>
          <input
            type="text"
            name="busOwner"
            value={formData.busOwner}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Owner NIC</label>
          <input
            type="text"
            name="busOwnerNIC"
            value={formData.busOwnerNIC}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Contact Number</label>
          <input
            type="text"
            name="busOwnerContact"
            value={formData.busOwnerContact}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Email Address</label>
          <input
            type="email"
            name="busOwnerEmail"
            value={formData.busOwnerEmail}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Address</label>
          <input
            type="text"
            name="busOwnerAddress"
            value={formData.busOwnerAddress}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* Route Information */}
      <div>
        <label className="block text-gray-700 font-medium">Route ID</label>
        <input
          type="text"
          name="routeId"
          value={formData.routeId}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Seat Positions */}
      <h2 className="text-lg font-semibold text-gray-700">Seat Positions</h2>
      {formData.seatPositions.map((seatPosition, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-700 font-medium">{seatPosition.positionName} - Seats Per Row</label>
            <input
              type="number"
              name="numberOfSeatsPerRow"
              value={seatPosition.numberOfSeatsPerRow}
              onChange={(e) => handleSeatChange(e, index)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">{seatPosition.positionName} - Number of Rows</label>
            <input
              type="number"
              name="numberOfRows"
              value={seatPosition.numberOfRows}
              onChange={(e) => handleSeatChange(e, index)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      ))}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        <Plus className="w-5 h-5 mr-2" />
        {isLoading ? "Adding..." : "Add Bus"}
      </button>

      {/* Error Message */}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </form>
  );
};

export default AddBusForm;
