import React from 'react'
import { Scale, Phone, Menu, X, Sun, Moon } from 'lucide-react'
import GlobalLanguageSwitcher from './GlobalLanguageSwitcher'
import { Link } from 'react-router-dom'

export default function Navbar({ mobileMenuOpen, setMobileMenuOpen, scrollY, darkMode, toggleDarkMode }) {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50
          ? `${darkMode ? 'bg-black/90' : 'bg-white/90'} backdrop-blur-md border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'} shadow-lg`
          : `${darkMode ? 'bg-black/70' : 'bg-white/80'} backdrop-blur-md border-b ${darkMode ? 'border-gray-800/60' : 'border-gray-200/60'}`
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${darkMode ? 'bg-white' : 'bg-black'} rounded-lg flex items-center justify-center`}>
              <Scale className={`w-6 h-6 ${darkMode ? 'text-black' : 'text-white'}`} />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>LawEase</h1>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Legal Solutions</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {[
              { name: 'Home', href: '#home' },
              { name: 'Services', href: '#services' },
              { name: 'About', href: '#about' },
              { name: 'FAQ', href: '#faq' },
              { name: 'Contact', href: '#contact' }
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'}`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Global Language Switcher (Google Translate powered) */}
            <div className="block">
              <GlobalLanguageSwitcher />
            </div>

            {/* CTA Button */}
            <Link
              to="/login"
              className={`hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${darkMode ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}
            >
              Get Started
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden w-10 h-10 rounded-lg flex items-center justify-center ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'}`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}