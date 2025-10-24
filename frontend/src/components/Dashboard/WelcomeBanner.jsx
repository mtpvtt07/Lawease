import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

export default function WelcomeBanner() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [userName, setUserName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Get user info from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserName(user.fullName || 'User');

    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    // Update time every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="relative overflow-hidden rounded-2xl animate-fade-in">
      {/* Animated Background Gradient */}
      <div className={`absolute inset-0 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-pink-900/40' 
          : 'bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20'
      } animate-gradient-move`} />
      
      {/* Glass Effect Overlay */}
      <div className="relative glass-effect backdrop-blur-xl p-8 md:p-12 border border-white/10">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        
        <div className="relative z-10">
          {/* Greeting Section */}
          <div className="mb-6">
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-3 bg-gradient-to-r ${
              theme === 'dark'
                ? 'from-blue-400 via-purple-400 to-pink-400'
                : 'from-blue-600 via-purple-600 to-pink-600'
            } bg-clip-text text-transparent animate-gradient-move`}>
              {greeting}, {userName}! 👋
            </h1>
            <p className={`text-lg md:text-xl ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            } animate-fade-in-slow`}>
              {t('welcome')} to your legal dashboard
            </p>
          </div>

          {/* Date & Time Section */}
          <div className={`flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-base ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>
            <div className="flex items-center gap-2 animate-slide-in-left">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">{formattedDate}</span>
            </div>
            
            <div className="flex items-center gap-2 animate-slide-in-right">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{formattedTime}</span>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
} 