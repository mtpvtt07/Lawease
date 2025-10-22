import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Scale, Sun, Moon } from "lucide-react";

export default function DashboardNavbar() {
  const [darkMode, setDarkMode] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrollY > 50 ? `${darkMode ? 'bg-black/90' : 'bg-white/90'} backdrop-blur-md border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'} shadow-lg` : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${darkMode ? 'bg-white' : 'bg-black'} rounded-lg flex items-center justify-center`}>
            <Scale className={`w-6 h-6 ${darkMode ? 'text-black' : 'text-white'}`} />
          </div>
          <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>LawEase</h1>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'}`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={handleLogout}
            className={`px-4 py-2 rounded-lg font-medium ${darkMode ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
