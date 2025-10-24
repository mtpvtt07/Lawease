import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Scale, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import GlobalLanguageSwitcher from "./GlobalLanguageSwitcher";

export default function DashboardNavbar() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleGoogleTranslate = () => {
    // The dropdown is now always visible, just need to focus it
    const dropdown = document.querySelector(".goog-te-combo");
    if (dropdown) {
      dropdown.focus();
      dropdown.click();
    }
  };

  const navLinks = [
    { name: t("home"), path: "/dashboard" },
    { name: t("exploreLaws"), path: "#laws" },
    { name: t("connectLawyers"), path: "#lawyers" },
    { name: t("contactSupport"), path: "#support" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 20
          ? `${theme === 'dark' ? 'bg-slate-900/95' : 'bg-white/95'} backdrop-blur-lg border-b ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'} shadow-lg`
          : `${theme === 'dark' ? 'bg-slate-900/70' : 'bg-white/80'} backdrop-blur-lg border-b ${theme === 'dark' ? 'border-slate-800/60' : 'border-slate-200/60'}`
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-smooth ${
                theme === "dark"
                  ? "bg-linear-to-br from-blue-500 to-purple-600"
                  : "bg-linear-to-br from-blue-600 to-purple-700"
              } group-hover:scale-110`}
            >
              <Scale className="w-6 h-6 text-white" />
            </div>
            <h1
              className={`text-xl font-bold bg-linear-to-r ${
                theme === "dark" ? "from-blue-400 to-purple-400" : "from-blue-600 to-purple-600"
              } bg-clip-text text-transparent`}
            >
              LawEase
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.path}
                className={`text-sm font-medium transition-smooth ${
                  theme === "dark" ? "text-slate-300 hover:text-blue-400" : "text-slate-600 hover:text-blue-600"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <GlobalLanguageSwitcher />

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-smooth ${
                theme === "dark" ? "bg-slate-800 hover:bg-slate-700 text-yellow-400" : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className={`md:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-smooth ${
                theme === "dark" ? "bg-slate-800 hover:bg-slate-700 text-slate-200" : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logout Button - Desktop */}
            <button
              onClick={handleLogout}
              className={`hidden md:block px-4 py-2 rounded-lg font-medium transition-smooth ${
                theme === "dark" ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" : "bg-red-50 text-red-600 hover:bg-red-100"
              }`}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className={`md:hidden border-t ${theme === "dark" ? "border-slate-800" : "border-slate-200"} py-4 space-y-2 animate-fade-in`}>
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.path}
                onClick={() => setShowMobileMenu(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  theme === "dark" ? "text-slate-300 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={handleLogout}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                theme === "dark" ? "text-red-400 hover:bg-red-500/20" : "text-red-600 hover:bg-red-50"
              }`}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
