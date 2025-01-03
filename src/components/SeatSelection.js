// import React, { useState, useEffect } from 'react';

// function SeatSelection({ selectedSeats = [], setSelectedSeats, proceed }) {
//   const [localSelectedSeats, setLocalSelectedSeats] = useState(selectedSeats);
//   const [seats, setSeats] = useState([]);

//   // Mock seat layout for 54 seats: 18 for left side (2 seats per row, 9 rows) and 36 for right side (3 seats per row, 12 rows)
//   useEffect(() => {
//     const seatLayout = [];
//     for (let i = 1; i <= 54; i++) { // 54 seats in total
//       seatLayout.push(i);
//     }
//     setSeats(seatLayout);
//   }, []);

//   // Sync selectedSeats with parent component
//   useEffect(() => {
//     setLocalSelectedSeats(selectedSeats);
//   }, [selectedSeats]);

//   // Toggle seat selection
//   const toggleSeat = (seat) => {
//     const newSelection = localSelectedSeats.includes(seat)
//       ? localSelectedSeats.filter((s) => s !== seat)
//       : [...localSelectedSeats, seat];
    
//     setLocalSelectedSeats(newSelection); // Update local state
//     setSelectedSeats(newSelection); // Update the parent component's state
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Select Your Seats</h2>

//       <div className="flex justify-between mb-6 gap-x-4"> {/* Added gap-x-4 for horizontal spacing */}
//         {/* Left side: 2 Seats per Row with distinct color */}
//         <div className="w-1/2">
//           <span className="text-lg font-semibold text-gray-700">Left Side</span>
//           <div className="grid grid-cols-2 gap-4">
//             {seats.slice(0, 18).map((seat) => (
//               <button
//                 key={seat}
//                 onClick={() => toggleSeat(seat)}
//                 className={`p-4 rounded-lg transition duration-300 ease-in-out
//                   ${localSelectedSeats.includes(seat)
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-blue-200 hover:bg-blue-300'}`}
//               >
//                 {seat}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Right side: 3 Seats per Row with different color */}
//         <div className="w-1/2">
//           <span className="text-lg font-semibold text-gray-700">Right Side</span>
//           <div className="grid grid-cols-3 gap-4">
//             {seats.slice(18, 54).map((seat) => (
//               <button
//                 key={seat}
//                 onClick={() => toggleSeat(seat)}
//                 className={`p-4 rounded-lg transition duration-300 ease-in-out
//                   ${localSelectedSeats.includes(seat)
//                     ? 'bg-green-500 text-white'
//                     : 'bg-green-200 hover:bg-green-300'}`}
//               >
//                 {seat}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Proceed Button */}
//       <div className="flex justify-center">
//         <button
//           onClick={proceed}
//           disabled={localSelectedSeats.length === 0}
//           className={`w-full md:w-1/2 py-3 px-4 text-lg font-semibold rounded-lg
//             ${localSelectedSeats.length === 0
//               ? 'bg-gray-400 cursor-not-allowed'
//               : 'bg-blue-500 text-white hover:bg-blue-600'}
//             transition duration-300`}
//         >
//           Proceed to Booking
//         </button>
//       </div>
//     </div>
//   );
// }

// export default SeatSelection;



import React, { useState, useEffect } from 'react';

function SeatSelection({ selectedSeats = [], setSelectedSeats, proceed }) {
  const [localSelectedSeats, setLocalSelectedSeats] = useState(selectedSeats);
  const [seats, setSeats] = useState([]);

  // Mock seat layout for 54 seats: 18 for left side (2 seats per row, 9 rows) and 36 for right side (3 seats per row, 12 rows)
  useEffect(() => {
    const seatLayout = [];
    for (let i = 1; i <= 54; i++) { // 54 seats in total
      seatLayout.push(i);
    }
    setSeats(seatLayout);
  }, []);

  // Sync selectedSeats with parent component
  useEffect(() => {
    setLocalSelectedSeats(selectedSeats);
  }, [selectedSeats]);

  // Toggle seat selection
  const toggleSeat = (seat) => {
    const newSelection = localSelectedSeats.includes(seat)
      ? localSelectedSeats.filter((s) => s !== seat)
      : [...localSelectedSeats, seat];
    
    setLocalSelectedSeats(newSelection);
    setSelectedSeats(newSelection); // Update the parent component's state
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Select Your Seats</h2>

      <div className="flex justify-between mb-6 gap-x-4">
        {/* Left side: 2 Seats per Row */}
        <div className="w-1/2">
          <span className="text-lg font-semibold text-gray-700">Left Side</span>
          <div className="grid grid-cols-2 gap-4">
            {seats.slice(0, 18).map((seat) => (
              <button
                key={seat}
                onClick={() => toggleSeat(seat)}
                className={`p-4 rounded-lg transition duration-300 ease-in-out
                  ${localSelectedSeats.includes(seat)
                    ? 'bg-blue-500 text-white'
                    : 'bg-blue-200 hover:bg-blue-300'}`}
              >
                {seat}
              </button>
            ))}
          </div>
        </div>

        {/* Right side: 3 Seats per Row */}
        <div className="w-1/2">
          <span className="text-lg font-semibold text-gray-700">Right Side</span>
          <div className="grid grid-cols-3 gap-4">
            {seats.slice(18, 54).map((seat) => (
              <button
                key={seat}
                onClick={() => toggleSeat(seat)}
                className={`p-4 rounded-lg transition duration-300 ease-in-out
                  ${localSelectedSeats.includes(seat)
                    ? 'bg-green-500 text-white'
                    : 'bg-green-200 hover:bg-green-300'}`}
              >
                {seat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={proceed}
          disabled={localSelectedSeats.length === 0}
          className={`w-full md:w-1/2 py-3 px-4 text-lg font-semibold rounded-lg
            ${localSelectedSeats.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'}
            transition duration-300`}
        >
          Proceed to Booking
        </button>
      </div>
    </div>
  );
}

export default SeatSelection;
