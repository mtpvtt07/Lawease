import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    welcome: 'Welcome Back',
    home: 'Home',
    exploreLaws: 'Explore Laws',
    connectLawyers: 'Connect to Lawyers',
    contactSupport: 'Contact & Support',
    userProfile: 'User Profile',
    lawFeed: 'Law Related Feed',
    readMore: 'Read More',
    loading: 'Loading...',
    aiChatbot: 'AI Chatbot',
  },
  hi: {
    welcome: 'स्वागत है',
    home: 'होम',
    exploreLaws: 'कानून जानें',
    connectLawyers: 'वकील से जुड़ें',
    contactSupport: 'संपर्क और सहायता',
    userProfile: 'उपयोगकर्ता प्रोफ़ाइल',
    lawFeed: 'कानूनी समाचार',
    readMore: 'और पढ़ें',
    loading: 'लोड हो रहा है...',
    aiChatbot: 'AI चैटबॉट',
  },
  ta: {
    welcome: 'மீண்டும் வரவேற்கிறோம்',
    home: 'முகப்பு',
    exploreLaws: 'சட்டங்களை ஆராயுங்கள்',
    connectLawyers: 'வழக்கறிஞர்களுடன் இணைக்கவும்',
    contactSupport: 'தொடர்பு மற்றும் ஆதரவு',
    userProfile: 'பயனர் சுயவிவரம்',
    lawFeed: 'சட்ட தொடர்பான செய்திகள்',
    readMore: 'மேலும் வாசிக்க',
    loading: 'ஏற்றுகிறது...',
    aiChatbot: 'AI சாட்பாட்',
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('lawease-language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('lawease-language', language);
  }, [language]);

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
