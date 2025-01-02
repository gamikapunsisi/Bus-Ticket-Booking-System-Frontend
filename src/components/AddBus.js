import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddBus = () => {
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    busId: '',
    busName: '',
    busType: '',
    busOwner: '',
    busOwnerContact: '',
    busOwnerEmail: '',
    busOwnerNIC: '',
    totalSeats: '',
    routeId: '',
  });

  const fetchBuses = async () => {
    // Simulate fetching data
    const mockData = [
      { busId: '1', busName: 'Express', busType: 'Luxury', routeId: '101' },
      { busId: '2', busName: 'City', busType: 'Normal', routeId: '102' },
    ];
    setBuses(mockData);
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess('Bus added successfully!');
    setBuses([...buses, formData]);
    setFormData({
      busId: '',
      busName: '',
      busType: '',
      busOwner: '',
      busOwnerContact: '',
      busOwnerEmail: '',
      busOwnerNIC: '',
      totalSeats: '',
      routeId: '',
    });
  };

  const handleDelete = (busId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this bus?');
    if (confirmDelete) {
      setBuses(buses.filter((bus) => bus.busId !== busId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <button
          onClick={() => navigate('/admin-dashboard')}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Bus Management</h1>
          <p className="mt-2 text-gray-600">Add and manage buses in the system</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Bus</h2>
          {success && <div className="text-green-600 mb-4">{success}</div>}
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Bus ID</label>
                <input
                  type="text"
                  name="busId"
                  value={formData.busId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bus Name</label>
                <input
                  type="text"
                  name="busName"
                  value={formData.busName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bus Type</label>
                <select
                  name="busType"
                  value={formData.busType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select bus type</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Semi-Luxury">Semi-Luxury</option>
                  <option value="Normal">Normal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Route ID</label>
                <input
                  type="text"
                  name="routeId"
                  value={formData.routeId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              {/* Owner Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Owner Name</label>
                <input
                  type="text"
                  name="busOwner"
                  value={formData.busOwner}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact</label>
                <input
                  type="text"
                  name="busOwnerContact"
                  value={formData.busOwnerContact}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add Bus
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Bus List</h2>
          <ul className="space-y-4">
            {buses.map((bus) => (
              <li
                key={bus.busId}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>
                  <p className="font-medium text-gray-900">{bus.busName}</p>
                  <p className="text-gray-600">Type: {bus.busType}</p>
                  <p className="text-gray-600">Route ID: {bus.routeId}</p>
                </div>
                <button
                  onClick={() => handleDelete(bus.busId)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddBus;
