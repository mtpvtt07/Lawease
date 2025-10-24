import React, { useEffect } from 'react';
import { Globe } from 'lucide-react';
import GoogleTranslate from './GoogleTranslate';
import { useTheme } from '../contexts/ThemeContext';

const GoogleTranslateWrapper = () => {
  const { theme } = useTheme();

  useEffect(() => {
    GoogleTranslate.init();
  }, []);

  // The Google Translate widget will inject an iframe; allow it to render
  // and apply theme-aware classes to the container so the menu matches the navbar.
  return (
    <div className={`relative inline-flex items-center px-1 py-1 rounded-md ${theme === 'dark' ? 'bg-transparent' : 'bg-transparent'}`}>
      <Globe className={`w-5 h-5 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`} />
      <div id="google_translate_element" className={`ml-2`} />
    </div>
  );
};

export default GoogleTranslateWrapper;