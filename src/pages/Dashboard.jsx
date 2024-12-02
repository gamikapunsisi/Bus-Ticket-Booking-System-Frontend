// import React from 'react'

// const Dashboard = () => {
//   return (
//     <div>Dashboard</div>
//   )
// }

// export default Dashboard

import React from "react";

import { BiSolidBus } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";
import { FaRoute } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";

const Dashboard = () => {
  const cards = [
    { id: 1, title: "Buses", icon: BiSolidBus, count: 12 },
    { id: 2, title: "Accounts", icon: VscAccount, count: 34 },
    { id: 3, title: "Routes", icon: FaRoute, count: 9 },
    { id: 4, title: "Drivers", icon: BsPeopleFill, count: 5 },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className="flex flex-col items-center justify-center p-4 transition bg-white rounded-md shadow-md hover:bg-gray-100"
        >
          {/* Render the Icon */}
          <card.icon className="mb-2 text-4xl text-blue-700" />
          <h2 className="text-lg font-semibold text-black">{card.title}</h2>
          {/* Render the Count */}
          <span className="text-sm font-medium text-gray-500">{card.count} items</span>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
