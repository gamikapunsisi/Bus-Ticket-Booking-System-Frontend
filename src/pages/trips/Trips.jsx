import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TripsPage = () => {
  const [trips, setTrips] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentTrip, setCurrentTrip] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    bus: '',
    availableSeats: '',
  });

  // API Base URL
  const API_URL = 'https://ntc-api.example.com';

  // Fetch trips
  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await axios.get(`${API_URL}/trips`);
      setTrips(response.data);
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this trip?')) return;
    try {
      await axios.delete(`${API_URL}/trips/${id}`);
      fetchTrips();
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentTrip) {
        // Update trip
        await axios.put(`${API_URL}/trips/${currentTrip.id}`, formData);
      } else {
        // Add new trip
        await axios.post(`${API_URL}/trips`, formData);
      }
      fetchTrips();
      setModalOpen(false);
      setFormData({ date: '', time: '', bus: '', availableSeats: '' });
      setCurrentTrip(null);
    } catch (error) {
      console.error('Error saving trip:', error);
    }
  };

  const openModal = (trip = null) => {
    setCurrentTrip(trip);
    if (trip) {
      setFormData({
        date: trip.date,
        time: trip.time,
        bus: trip.bus,
        availableSeats: trip.availableSeats,
      });
    } else {
      setFormData({ date: '', time: '', bus: '', availableSeats: '' });
    }
    setModalOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Trips Management</h1>
      <button
        className="px-4 py-2 mb-4 text-white bg-blue-500 rounded"
        onClick={() => openModal()}
      >
        Add Trip
      </button>
      <table className="min-w-full bg-white rounded shadow">
        <thead className="text-white bg-gray-800">
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Bus</th>
            <th className="px-4 py-2">Available Seats</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id}>
              <td className="px-4 py-2">{trip.date}</td>
              <td className="px-4 py-2">{trip.time}</td>
              <td className="px-4 py-2">{trip.bus}</td>
              <td className="px-4 py-2">{trip.availableSeats}</td>
              <td className="px-4 py-2">
                <button
                  className="px-2 py-1 mr-2 text-white bg-yellow-500 rounded"
                  onClick={() => openModal(trip)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 text-white bg-red-500 rounded"
                  onClick={() => handleDelete(trip.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded shadow-lg">
            <h2 className="mb-4 text-xl font-bold">
              {currentTrip ? 'Edit Trip' : 'Add Trip'}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Bus</label>
                <input
                  type="text"
                  name="bus"
                  value={formData.bus}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Available Seats</label>
                <input
                  type="number"
                  name="availableSeats"
                  value={formData.availableSeats}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 mr-2 text-white bg-gray-500 rounded"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripsPage;
