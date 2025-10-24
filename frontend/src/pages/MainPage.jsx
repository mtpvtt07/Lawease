import React, { useEffect } from 'react';
import DashboardNavbar from '../components/DashboardNavbar';
import WelcomeBanner from '../components/Dashboard/WelcomeBanner';
import LawFeed from '../components/Dashboard/LawFeed';
import LegalChatbot from './LegalChatBot';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import GoogleTranslate from '../components/GoogleTranslate';

export default function MainPage() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    // Initialize Google Translate
    GoogleTranslate.init();
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    return () => {
      GoogleTranslate.cleanup();
    };
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-b from-slate-50 via-white to-slate-50'
    }`}>
      {/* Dashboard Navbar */}
      <DashboardNavbar />

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Welcome Banner */}
          <WelcomeBanner />

          {/* Law Feed Section */}
          <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <LawFeed />
          </section>

          {/* Additional Sections can be added here */}
        </div>
      </main>

      {/* Footer */}
      <footer className={`border-t py-8 mt-16 ${
        theme === 'dark' 
          ? 'border-slate-800 bg-slate-900/50' 
          : 'border-slate-200 bg-slate-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <div>
              <h3 className={`text-lg font-bold mb-3 ${
                theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
              }`}>
                About LawEase
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Your trusted companion for legal information and assistance. Making law accessible to everyone.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className={`text-lg font-bold mb-3 ${
                theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
              }`}>
                Quick Links
              </h3>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Contact Us', 'Help Center'].map((link, i) => (
                  <li key={i}>
                    <a href="#" className={`text-sm transition-smooth ${
                      theme === 'dark' 
                        ? 'text-slate-400 hover:text-blue-400' 
                        : 'text-slate-600 hover:text-blue-600'
                    }`}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className={`text-lg font-bold mb-3 ${
                theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
              }`}>
                Connect With Us
              </h3>
              <div className="flex gap-3">
                {['📘', '🐦', '📷', '💼'].map((icon, i) => (
                  <button
                    key={i}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-smooth ${
                      theme === 'dark'
                        ? 'bg-slate-800 hover:bg-slate-700'
                        : 'bg-slate-200 hover:bg-slate-300'
                    }`}
                  >
                    <span className="text-lg">{icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className={`mt-8 pt-8 border-t text-center text-sm ${
            theme === 'dark' 
              ? 'border-slate-800 text-slate-500' 
              : 'border-slate-200 text-slate-500'
          }`}>
            © {new Date().getFullYear()} LawEase. All rights reserved. Made with ❤️ for legal accessibility.
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <LegalChatbot />
    </div>
  );
}
