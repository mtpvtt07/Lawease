import React from 'react';
import WelcomeBanner from '../components/Dashboard/WelcomeBanner';
import LegalCategories from '../components/Dashboard/LegalCategories';
import QuickAccessPanel from '../components/Dashboard/QuickAccessPanel';
import RecentArticles from '../components/Dashboard/RecentArticles';
import LegalChatbot from './LegalChatBot';

export default function MainPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="border-b border-white/10">
        {/* Reuse your Navbar here if needed */}
      </header>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 space-y-10">
        <WelcomeBanner />
        <QuickAccessPanel />
        <LegalCategories />
        <RecentArticles />
      </main>
      <footer className="border-t border-white/10 py-6 text-center text-gray-400 text-sm">
        © 2023 LawEase. All rights reserved.
      </footer>
      <LegalChatbot />
    </div>
  );
} 