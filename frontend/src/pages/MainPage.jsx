import React from 'react';
import WelcomeBanner from '../components/Dashboard/WelcomeBanner';
import LegalCategories from '../components/Dashboard/LegalCategories';
import QuickAccessPanel from '../components/Dashboard/QuickAccessPanel';
import RecentArticles from '../components/Dashboard/RecentArticles';
import { useTheme } from '../contexts/ThemeContext';

export default function MainPage() {
  const { darkMode } = useTheme();
  
  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      darkMode 
        ? 'bg-black text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <header className={`border-b transition-colors duration-300 ${
        darkMode ? 'border-white/10' : 'border-gray-200'
      }`}>
        {/* Reuse your Navbar here if needed */}
      </header>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 space-y-10">
        <WelcomeBanner />
        <QuickAccessPanel />
        <LegalCategories />
        <RecentArticles />
      </main>
      <footer className={`border-t py-6 text-center text-sm transition-colors duration-300 ${
        darkMode 
          ? 'border-white/10 text-gray-400' 
          : 'border-gray-200 text-gray-600'
      }`}>
        © 2023 LawEase. All rights reserved.
      </footer>
    </div>
  );
} 