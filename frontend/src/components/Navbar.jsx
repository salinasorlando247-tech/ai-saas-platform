import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="bg-gray-800 text-white flex justify-between items-center h-16 px-6 ml-64">
      <div className="text-xl font-bold">ForgeAI Dashboard</div>
      <div className="flex items-center space-x-4">
        <button className="relative">
          <FaBell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center space-x-2 cursor-pointer">
          <FaUserCircle size={24} />
          <span>Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
