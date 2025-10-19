import React from 'react'
import { Scale, Users, Shield, Award, Star, Phone, Globe, Menu, X } from 'lucide-react'

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', label: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', label: 'తెలుగు', flag: '🇮🇳' },
  { code: 'bn', label: 'বাংলা', flag: '🇮🇳' },
  { code: 'gu', label: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'mr', label: 'मराठी', flag: '🇮🇳' },
]

export default function Navbar({ language, setLanguage, mobileMenuOpen, setMobileMenuOpen, scrollY }) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-gradient-to-r from-black/90 via-slate-900/90 to-indigo-900/90 shadow-2xl border-b border-white/10 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="relative group">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl rotate-12 group-hover:rotate-0 transition-all duration-500">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div className="ml-3">
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  LawEase
                </h1>
                <p className="text-xs text-gray-400 -mt-1">Legal Solutions Simplified</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {[
              { name: 'Home', href: '#home' },
              { name: 'Services', href: '#services' },
              { name: 'Find Lawyers', href: '#lawyers' },
              { name: 'About Us', href: '#about' },
              { name: 'FAQ', href: '#faq' }, // <- New section
              { name: 'Success Stories', href: '#testimonials' },
              { name: 'Contact', href: '#contact' }
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-1 py-2 text-sm font-medium text-white/90 hover:text-amber-400 transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative hidden md:block">
              <select
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="appearance-none bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 pr-8 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 hover:bg-white/20 transition-all duration-300"
                style={{ minWidth: '120px' }}
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code} className="text-black bg-white">
                    {lang.flag} {lang.label}
                  </option>
                ))}
              </select>
              <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
            </div>

            {/* Emergency Contact */}
            <div className="hidden md:flex items-center">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <Phone className="w-4 h-4 mr-2" />
                <span>Emergency</span>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-amber-400 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-400 transition-all duration-300"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}