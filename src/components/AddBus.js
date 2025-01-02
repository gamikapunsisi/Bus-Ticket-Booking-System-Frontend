import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
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
    busOwnerAddress: '',
    busOwnerNIC: '',
    totalSeats: '',
    routeId: '',
    seatPosition: {
      leftPosition: {
        numberOfSeatsPerRow: 2,
        numberOfRows: 10
      },
      rightPosition: {
        numberOfSeatsPerRow: 2,
        numberOfRows: 10
      },
      backPosition: {
        numberOfSeatsPerRow: 5,
        numberOfRows: 1
      }
    }
  });

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/buses', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setBuses(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch buses');
      }
    } catch (err) {
      setError('Failed to fetch buses: ' + err.message);
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleDelete = async (busId) => {
    if (!window.confirm('Are you sure you want to delete this bus?')) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5001/api/buses/${busId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setSuccess('Bus deleted successfully!');
        await fetchBuses(); // Refresh the bus list
      } else {
        throw new Error(data.message || 'Failed to delete bus');
      }
    } catch (err) {
      setError('Failed to delete bus: ' + err.message);
      console.error('Delete error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:5001/api/buses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          totalSeats: calculateTotalSeats(formData.seatPosition)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add bus');
      }

      if (data.success) {
        setSuccess('Bus added successfully!');
        // Reset form
        setFormData({
          busId: '',
          busName: '',
          busType: '',
          busOwner: '',
          busOwnerContact: '',
          busOwnerEmail: '',
          busOwnerAddress: '',
          busOwnerNIC: '',
          totalSeats: '',
          routeId: '',
          seatPosition: {
            leftPosition: {
              numberOfSeatsPerRow: 2,
              numberOfRows: 10
            },
            rightPosition: {
              numberOfSeatsPerRow: 2,
              numberOfRows: 10
            },
            backPosition: {
              numberOfSeatsPerRow: 5,
              numberOfRows: 1
            }
          }
        });
        await fetchBuses(); // Refresh the bus list
      }
    } catch (err) {
      setError(err.message);
      console.error('Submit error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSeatPositionChange = (position, field, value) => {
    setFormData(prev => ({
      ...prev,
      seatPosition: {
        ...prev.seatPosition,
        [position]: {
          ...prev.seatPosition[position],
          [field]: parseInt(value, 10)
        }
      }
    }));
  };

  const calculateTotalSeats = (seatPosition) => {
    const leftSeats = seatPosition.leftPosition.numberOfSeatsPerRow * seatPosition.leftPosition.numberOfRows;
    const rightSeats = seatPosition.rightPosition.numberOfSeatsPerRow * seatPosition.rightPosition.numberOfRows;
    const backSeats = seatPosition.backPosition.numberOfSeatsPerRow * seatPosition.backPosition.numberOfRows;
    return leftSeats + rightSeats + backSeats;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Back Button */}
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
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Bus Management</h1>
          <p className="mt-2 text-gray-600">Add and manage buses in the system</p>
        </div>

        {/* Add Bus Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Bus</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Basic Bus Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bus ID
                </label>
                <input
                  type="text"
                  name="busId"
                  value={formData.busId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter bus ID"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bus Name
                </label>
                <input
                  type="text"
                  name="busName"
                  value={formData.busName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter bus name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bus Type
                </label>
                <select
                  name="busType"
                  value={formData.busType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select bus type</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Semi-Luxury">Semi-Luxury</option>
                  <option value="Normal">Normal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Route ID
                </label>
                <input
                  type="text"
                  name="routeId"
                  value={formData.routeId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter route ID"
                  required
                />
              </div>

              {/* Owner Information */}
              <div className="col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Owner Information</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Owner Name
                </label>
                <input
                  type="text"
                  name="busOwner"
                  value={formData.busOwner}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter owner name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="busOwnerContact"
                  value={formData.busOwnerContact}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter contact number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="busOwnerEmail"
                  value={formData.busOwnerEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  NIC
                </label>
                <input
                  type="text"
                  name="busOwnerNIC"
                  value={formData.busOwnerNIC}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter NIC number"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  name="busOwnerAddress"
                  value={formData.busOwnerAddress}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter address"
                  required
                />
              </div>

              <div className="col-span-2 mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Seat Configuration</h3>
                
                {/* Left Position */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Left Side Configuration
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500">Seats Per Row</label>
                        <select
                          value={formData.seatPosition.leftPosition.numberOfSeatsPerRow}
                          onChange={(e) => handleSeatPositionChange('leftPosition', 'numberOfSeatsPerRow', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                          {[1, 2, 3].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500">Number of Rows</label>
                        <select
                          value={formData.seatPosition.leftPosition.numberOfRows}
                          onChange={(e) => handleSeatPositionChange('leftPosition', 'numberOfRows', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Right Position */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Right Side Configuration
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500">Seats Per Row</label>
                        <select
                          value={formData.seatPosition.rightPosition.numberOfSeatsPerRow}
                          onChange={(e) => handleSeatPositionChange('rightPosition', 'numberOfSeatsPerRow', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                          {[1, 2, 3].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500">Number of Rows</label>
                        <select
                          value={formData.seatPosition.rightPosition.numberOfRows}
                          onChange={(e) => handleSeatPositionChange('rightPosition', 'numberOfRows', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Back Position */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Back Row Configuration
                    </label>
                    <div className="grid grid-cols-2 gap-4 md:w-1/2">
                      <div>
                        <label className="block text-xs text-gray-500">Seats Per Row</label>
                        <select
                          value={formData.seatPosition.backPosition.numberOfSeatsPerRow}
                          onChange={(e) => handleSeatPositionChange('backPosition', 'numberOfSeatsPerRow', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                          {[...Array(5)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500">Number of Rows</label>
                        <select
                          value={formData.seatPosition.backPosition.numberOfRows}
                          onChange={(e) => handleSeatPositionChange('backPosition', 'numberOfRows', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value={1}>1</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Seats Display */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Seats
                  </label>
                  <input
                    type="number"
                    name="totalSeats"
                    value={
                      (formData.seatPosition.leftPosition.numberOfSeatsPerRow * formData.seatPosition.leftPosition.numberOfRows) +
                      (formData.seatPosition.rightPosition.numberOfSeatsPerRow * formData.seatPosition.rightPosition.numberOfRows) +
                      (formData.seatPosition.backPosition.numberOfSeatsPerRow * formData.seatPosition.backPosition.numberOfRows)
                    }
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Error and Success Messages */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">{success}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                <Plus className="w-5 h-5 mr-2" />
                {isLoading ? 'Adding...' : 'Add Bus'}
              </button>
            </div>
          </form>
        </div>

        {/* Buses Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Buses List</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bus ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bus Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {buses.map((bus) => (
                  <tr key={bus._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {bus.busId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {bus.busName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {bus.busType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {bus.busOwner}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {bus.busOwnerContact}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDelete(bus.busId)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBus;
