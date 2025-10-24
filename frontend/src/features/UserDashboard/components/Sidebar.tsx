// src/components/Sidebar.tsx
import React from "react";
import { FaUser, FaBookmark, FaHistory, FaHandshake } from "react-icons/fa";

const Sidebar: React.FC = () => (
  <aside className="bg-gradient-to-b from-blue-200 to-blue-400 w-56 min-h-screen flex flex-col items-center py-8 px-2 rounded-r-3xl shadow-lg font-sans">
    <img src="/logo192.png" className="h-12 mb-6 rounded-xl shadow" alt="LawEase"/>
    <div className="mb-8 text-2xl font-extrabold text-blue-900 tracking-wide">LawEase</div>
    <nav className="flex flex-col gap-2 w-full">
      <a className="flex items-center gap-4 px-4 py-3 bg-white bg-opacity-75 rounded-xl font-semibold text-blue-900 shadow border-l-4 border-blue-500" href="#">
        <FaUser className="w-6 h-6"/> Profile
      </a>
      <a className="flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-blue-900 hover:bg-blue-100" href="#"> 
        <FaBookmark className="w-6 h-6"/> Saved Solutions
      </a>
      <a className="flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-blue-900 hover:bg-blue-100" href="#">
        <FaHistory className="w-6 h-6"/> Consultation History
      </a>
      <a className="flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-blue-900 hover:bg-blue-100" href="#">
        <FaHandshake className="w-6 h-6"/> Lawyer Connect
      </a>
    </nav>
  </aside>
);

export default Sidebar;
