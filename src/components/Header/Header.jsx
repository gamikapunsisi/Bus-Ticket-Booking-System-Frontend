import React, { useState } from "react";
import { BsBusFrontFill } from "react-icons/bs";
import { FaUserCog } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import UserProfileAvatar from "../../assets/user-profile-avatar.jpg";

const Header = () => {
  const [user, setUser] = useState(true);
  const [dropDown, setDropDown] = useState(false);

  return (
    <div className=" w-full fixed top-0 h-[70px] z-50 flex items-center justify-between px-6 shadow-md bg-white rounded-bl-lg rounded-br-lg font-sans ">
      <div className="flex items-center gap-2 ">
        <h1 className=" max-[400px]:text-xl text-4xl font-bold text-gray-700 font-mono">SLTB E-Booking</h1>
        <BsBusFrontFill className="max-[400px]:text-lg  text-4xl text-blue-700" />
      </div>
      <div className="">
        {user ? (
          <div
            onClick={() => setDropDown(!dropDown)}
            className="relative flex items-center gap-2 cursor-pointer"
          >
            <h1 className=" text-gray-700 max-[300px]:hidden">Welcome, Gamika</h1>
            <img src={UserProfileAvatar} alt="avatar" className="w-12 h-12 rounded-full" />
            {dropDown && (
              <div className="absolute top-14 border-t-[4px] border-blue-500 right-1 w-40 bg-white shadow-md rounded-lg">
                <ul className="p-2 pb-3">
                  <li className="flex items-center gap-4 hover:bg-gray-100 border-b-gray-200 border-b-[1px] p-2 hover:rounded-md cursor-pointer">
                    <FaUserCog className="text-lg text-blue-500 " />
                    Profile
                  </li>
                  <li className="flex items-center gap-4 hover:bg-gray-100 p-2 border-b-gray-200 border-b-[1px] hover:rounded-md cursor-pointer">
                    <IoMdSettings className="text-lg text-blue-500 " />
                    Settings
                  </li>
                  <li className="flex items-center gap-4 hover:bg-gray-100 p-2 border-b-gray-200 border-b-[1px] hover:rounded-md cursor-pointer">
                    <IoLogOut className="text-lg text-blue-500 " />
                    Sign Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <button className="bg-gray-600 border-r-[2px] sm:border-r-[4px] border-blue-400 text-white px-2 text-sm py-1 sm:px-4 sm:py-2 rounded-md">
              Sign In
            </button>
            <button className="bg-gray-600 border-r-[2px] sm:border-r-[4px] border-blue-400 text-white px-2 text-sm py-1 sm:text-lg sm:px-4 sm:py-2 rounded-md">
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
