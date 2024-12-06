import React, { useState } from "react";
import ControlIcon from "../../assets/control.png";
import { FaBusAlt } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { MdOutlineTravelExplore } from "react-icons/md";


const Sidebar = ({ setExpandSideBar, expandSideBar }) => {
  const navigate = useNavigate();
  const Menus = [
    { title: "Dashboard", icon: <FaChartLine />, gap: true },
    { title: "Routes", icon: <FaMapMarkedAlt />, path: "/add-road-routes" },
    { title: "Buses", icon: <FaBusAlt />, path: "/add-bus" },
    { title: "Trips ", icon: <MdOutlineTravelExplore />,path: "/add-trip" }, 
    { title: "Schedule ", icon: <FaCalendarAlt /> },
    { title: "Profile", icon: <CgProfile />, path: "/add-commuter-profile" },
    { title: "Setting", icon: <FaCog /> },
  ];

  return (
    <div
      className={` ${
        expandSideBar ? "w-64" : "w-20"
      }  bg-gray-800 h-screen p-5 fixed duration-300 pt-20 border-r-[4px] border-blue-700`}
    >
      <img
        src={ControlIcon}
        className={`absolute cursor-pointer -right-5 top-24 w-9 border-dark-purple
           border-2 rounded-full  ${!expandSideBar && "rotate-180"}`}
        onClick={() => setExpandSideBar(!expandSideBar)}
      />
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <li
            onClick={() => navigate(Menu.path)}
            key={index}
            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm sm:text-lg items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-4"} ${
              index === 0 && "bg-light-white"
            } `}
          >
            {Menu.icon}
            <span className={`${!expandSideBar && "hidden"} origin-left duration-200`}>
              {Menu.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
