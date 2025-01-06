import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface PaymentProps {
  tripId: string;
  tripDate: string;
  selectedSeats: string[];
}

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tripId, tripDate, selectedSeats } = location.state as PaymentProps;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem('token');

      const response = await fetch(`${baseUrl}/api/bookings/book`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          trip_id: tripId,
          seat_ids: selectedSeats,
          payment_info: cardInfo
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        navigate('/booking-confirmation', { 
          state: { 
            bookingIds: data.booking_ids,
            tripDate,
            selectedSeats 
          }
        });
      } else {
        throw new Error(data.message || 'Payment failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Details</h2>

          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">Selected Seats: {selectedSeats.join(', ')}</p>
            <p className="text-blue-800">Trip Date: {new Date(tripDate).toLocaleString()}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Cardholder Name</label>
                <input
                  type="text"
                  name="cardholderName"
                  value={cardInfo.cardholderName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardInfo.cardNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  maxLength={16}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={cardInfo.expiryDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    maxLength={5}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={cardInfo.cvv}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    maxLength={3}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 rounded ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {loading ? 'Processing...' : 'Pay & Confirm'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment; 