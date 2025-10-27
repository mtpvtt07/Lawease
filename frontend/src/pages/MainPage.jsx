import React, { useEffect } from 'react';
import DashboardNavbar from '../components/DashboardNavbar';
import WelcomeBanner from '../components/Dashboard/WelcomeBanner';
import LawFeed from '../components/Dashboard/LawFeed';
import LegalChatbot from './LegalChatBot';
import { useTheme } from '../contexts/ThemeContext';
import GoogleTranslate from '../components/GoogleTranslate';

export default function MainPage() {
  const { theme } = useTheme();

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
      {/* Footer intentionally removed on Dashboard/Main page */}
      {/* AI Chatbot */}
      <LegalChatbot />
    </div>
  );
}
