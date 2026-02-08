import React from "react";
import { NavLink } from "react-router-dom";
import { FaVideo, FaCalendarAlt, FaChartBar, FaUserShield, FaCog } from "react-icons/fa";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/", icon: <FaChartBar /> },
    { name: "AI Videos", path: "/ai-videos", icon: <FaVideo /> },
    { name: "Scheduling", path: "/scheduling", icon: <FaCalendarAlt /> },
    { name: "Analytics", path: "/analytics", icon: <FaChartBar /> },
    { name: "Users / Roles", path: "/users", icon: <FaUserShield /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        ForgeAI
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center p-4 hover:bg-gray-800 transition-colors ${
                isActive ? "bg-gray-800 font-semibold" : ""
              }`
            }
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
