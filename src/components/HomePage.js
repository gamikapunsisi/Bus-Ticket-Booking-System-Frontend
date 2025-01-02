import React from "react";

const HomePage = () => {
  return (
    <div>


      {/* Header Section */}
      <header
        className="bg-cover bg-center h-screen text-white flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/images/bus2.png')", // Correct path from the public folder
          backgroundPosition: 'center', // Ensures the image is centered
          backgroundSize: 'cover', // Ensures the image covers the entire header
        }}
      >
        {/* Search Section */}
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-6xl font-bold mb-6">Online Seat Reservation</h2>
          <div className="bg-gray-100/80 p-8 rounded-lg shadow-md backdrop-blur-sm">
            <form className="flex flex-col md:flex-row items-center justify-center gap-4">
              {/* FROM Dropdown */}
              <select
                className="w-full md:w-1/4 p-3 border border-gray-300 rounded text-black"
              >
                <option value="">From</option>
                <option value="New York">Kandy</option>
                <option value="San Francisco">Anuradhapura</option>
                <option value="Chicago">Kurunegala</option>
                {/* Add more locations */}
              </select>
              {/* TO Dropdown */}
              <select
                className="w-full md:w-1/4 p-3 border border-gray-300 rounded text-black"
              >
                <option value="">To</option>
                <option value="Boston">Colombo</option>
                <option value="Los Angeles">Galle</option>
                <option value="Detroit">Negombo</option>
                {/* Add more locations */}
              </select>
              {/* Travel Date Input */}
              <input
                type="date"
                className="w-full md:w-1/4 p-3 border border-gray-300 rounded"
              />
              {/* Search Button */}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
              >
                Search
              </button>
            </form>
          </div>
        </div>


      </header>



      {/* Featured Routes */}
      <section id="routes" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Popular Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { route: "Makumbura to Galle", price: "Rs:1000" },
              { route: "Mathara to Colombo", price: "Rs 1200" },
              { route: "Kandy to Colombo", price: "Rs 800" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold text-blue-600">{item.route}</h3>
                <p className="mt-2 text-gray-700">Starting from {item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
};

export default HomePage;
