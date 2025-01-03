import React, { useState } from 'react';
import axios from 'axios';

const AddBusForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    busId: '',
    busName: '',
    busType: 'Standard',
    busOwner: '',
    busOwnerNIC: '',
    busOwnerContact: '',
    busOwnerEmail: '',
    busOwnerAddress: '',
    routeId: '',
    totalSeats: '',
    seatPositions: [
      { positionName: 'Left', numberOfSeatsPerRow: '', numberOfRows: '' },
      { positionName: 'Right', numberOfSeatsPerRow: '', numberOfRows: '' },
      { positionName: 'Back', numberOfSeatsPerRow: '', numberOfRows: '' },
    ],
  });

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

    updatedSeatPositions[index] = {
      ...updatedSeatPositions[index],
      [name]: value,
    };

    setFormData({
      ...formData,
      seatPositions: updatedSeatPositions,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the form data to the backend
      const response = await axios.post('http://localhost:5000/api/buses', formData);
      console.log('New Bus Added:', response.data);
      onSubmit(response.data); // Call the parent onSubmit function if needed
    } catch (error) {
      console.error('Error adding bus:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Add New Bus</h1>

      {/* General Bus Information */}
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
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">Owner Information</h2>
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
        {/* Other owner fields... */}
      </div>

      {/* Seat Position Information */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">Seat Positions</h2>
        {formData.seatPositions.map((seatPosition, index) => (
          <div key={index} className="space-y-2">
            <h3 className="text-md font-semibold text-blue-600">{seatPosition.positionName} Position</h3>
            <div>
              <label className="block text-gray-700 font-medium">Seats Per Row</label>
              <input
                type="number"
                name="numberOfSeatsPerRow"
                value={seatPosition.numberOfSeatsPerRow}
                onChange={(e) => handleSeatChange(e, index)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Number of Rows</label>
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
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
      >
        Add Bus
      </button>
    </form>
  );
};

const AdminDashboard = () => {
  const handleAddBus = (busData) => {
    console.log('New Bus Data:', busData);
    // You can handle the added bus here, like updating the state or notifying the user
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <AddBusForm onSubmit={handleAddBus} />
    </div>
  );
};

export default AdminDashboard;
