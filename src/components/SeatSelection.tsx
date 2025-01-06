import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface SeatSelectionProps {
  tripId: string;
  tripDate: string;
}

interface BookedSeat {
  seat_id: string;
}

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tripId, tripDate } = location.state as SeatSelectionProps;
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookedSeats, setBookedSeats] = useState<BookedSeat[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const seatLayout = {
    rows: 8,
    seatsPerRow: 4,
    aisle: 2,
  };

  // Fetch booked seats when component mounts
  useEffect(() => {
    const fetchBookedSeats = async () => {
      setLoading(true); // Start loading
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/bus/trips/${tripId}/seats`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const formattedBookedSeats = data.bookedSeats.map((seatId: string) => ({
          seat_id: seatId,
        }));
        setBookedSeats(formattedBookedSeats);
      } catch (err) {
        setError('Failed to fetch booked seats');
        console.error('Error fetching booked seats:', err);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchBookedSeats();
  }, [tripId]);

  const isSeatBooked = (seatId: string) => {
    return bookedSeats.some((booking) => booking.seat_id === seatId);
  };

  const isSeatSelected = (seatId: string) => selectedSeats.includes(seatId);

  const toggleSeat = (seatId: string) => {
    if (isSeatBooked(seatId)) return; // Don't allow selecting booked seats

    if (isSeatSelected(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    setLoading(true); // Start loading
    try {
      // Simulate booking process or navigate to a payment API
      await new Promise((res) => setTimeout(res, 1000)); // Example delay
      navigate('/payment', {
        state: {
          tripId,
          tripDate,
          selectedSeats,
        },
      });
    } catch (err) {
      console.error('Booking error:', err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Select Your Seats
          </h2>

          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Trip Info */}
          <div className="mb-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              Trip Date: {new Date(tripDate).toLocaleString()}
            </p>
            <p className="text-blue-800">Trip ID: {tripId}</p>
          </div>

          {/* Screen */}
          <div className="w-full mb-8">
            <div className="w-2/3 mx-auto h-8 bg-gray-300 rounded-t-3xl flex items-center justify-center">
              <span className="text-gray-600 text-sm">Front of Bus</span>
            </div>
          </div>

          {/* Seat Layout */}
          <div className="w-full max-w-md mx-auto mb-8">
            {Array.from({ length: seatLayout.rows }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex justify-center mb-2">
                {Array.from({ length: seatLayout.seatsPerRow }).map(
                  (_, seatIndex) => {
                    const seatNumber =
                      rowIndex * seatLayout.seatsPerRow + seatIndex + 1;
                    const seatId = `seat-${seatNumber}`;
                    const isBooked = isSeatBooked(seatId);
                    const isAisleSeat = seatIndex === seatLayout.aisle - 1;

                    return (
                      <>
                        <button
                          key={seatId}
                          disabled={isBooked}
                          className={`
                          w-12 h-12 m-1 rounded-t-lg transition-all
                          ${
                            isBooked
                              ? 'bg-red-200 text-red-700 cursor-not-allowed'
                              : isSeatSelected(seatId)
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                          }
                          flex items-center justify-center
                        `}
                          onClick={() => toggleSeat(seatId)}
                        >
                          {seatNumber}
                        </button>
                        {isAisleSeat && <div className="w-8" />}
                      </>
                    );
                  }
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-4 mb-8">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gray-200 rounded mr-2"></div>
              <span className="text-sm text-gray-600">Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-blue-500 rounded mr-2"></div>
              <span className="text-sm text-gray-600">Selected</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-red-200 rounded mr-2"></div>
              <span className="text-sm text-gray-600">Booked</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Back
            </button>
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold">
                Selected: {selectedSeats.length} seats
              </span>
              <button
                onClick={handleBooking}
                disabled={loading || selectedSeats.length === 0}
                className={`
                  px-6 py-2 rounded
                  ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : selectedSeats.length > 0
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                {loading ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
