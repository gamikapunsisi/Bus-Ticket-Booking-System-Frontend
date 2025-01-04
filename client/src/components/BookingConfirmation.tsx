import { useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { FaDownload, FaHome } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';

interface BookingConfirmationProps {
  bookingIds: string[];
  tripDate: string;
  selectedSeats: string[];
}

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingIds, tripDate, selectedSeats } = location.state as BookingConfirmationProps;
  const ticketRef = useRef<HTMLDivElement>(null);

  const downloadTicket = async () => {
    if (!ticketRef.current) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(ticketRef.current);
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `bus-ticket-${bookingIds[0]}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating ticket:', err);
    }
  };

  // Create QR code data
  const qrData = JSON.stringify({
    bookingId: bookingIds[0],
    seats: selectedSeats,
    date: tripDate,
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-green-600 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600">Your tickets have been booked successfully.</p>
          </div>

          {/* Ticket Design */}
          <div 
            ref={ticketRef}
            className="bg-white border-4 border-blue-500 rounded-lg p-6 mb-6"
          >
            <div className="border-b-2 border-dashed border-gray-300 pb-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-blue-600">Bus Ticket</h3>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Booking ID:</p>
                  <p className="font-mono">{bookingIds[0]}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Date & Time:</p>
                  <p className="font-semibold">
                    {new Date(tripDate).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Seat Numbers:</p>
                  <p className="font-semibold">{selectedSeats.join(', ')}</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <QRCodeSVG
                  value={qrData}
                  size={128}
                  level="H"
                  className="mx-auto"
                  includeMargin
                />
              </div>
              <p className="text-sm text-gray-500">
                Please show this ticket when boarding the bus
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={downloadTicket}
              className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <FaDownload /> Download Ticket
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              <FaHome /> Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation; 