import React, { useEffect, useMemo, useState } from 'react';
import { Languages, Search, Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import GoogleTranslate from './GoogleTranslate';

// Minimal but broad language list (can be extended easily)
const ALL_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi (हिंदी)' },
  { code: 'ta', name: 'Tamil (தமிழ்)' },
  { code: 'te', name: 'Telugu (తెలుగు)' },
  { code: 'mr', name: 'Marathi (मराठी)' },
  { code: 'bn', name: 'Bengali (বাংলা)' },
  { code: 'gu', name: 'Gujarati (ગુજરાતી)' },
  { code: 'kn', name: 'Kannada (ಕನ್ನಡ)' },
  { code: 'ml', name: 'Malayalam (മലയാളം)' },
  { code: 'pa', name: 'Punjabi (ਪੰਜਾਬੀ)' },
  { code: 'ur', name: 'Urdu (اردو)' },
  { code: 'or', name: 'Odia (ଓଡିଆ)' },
  { code: 'as', name: 'Assamese (অসমীয়া)' },
  { code: 'ne', name: 'Nepali (नेपाली)' },
  { code: 'sd', name: 'Sindhi (سنڌي‎)' },
  { code: 'si', name: 'Sinhala (සිංහල)' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'es', name: 'Spanish' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'it', name: 'Italian' },
  { code: 'ru', name: 'Russian' },
  { code: 'ar', name: 'Arabic' },
  { code: 'tr', name: 'Turkish' },
  { code: 'th', name: 'Thai' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'id', name: 'Indonesian' },
  { code: 'ms', name: 'Malay' },
  { code: 'fil', name: 'Filipino' },
  { code: 'sw', name: 'Swahili' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' },
  { code: 'zh-TW', name: 'Chinese (Traditional)' },
  { code: 'he', name: 'Hebrew' },
  { code: 'fa', name: 'Persian' },
  { code: 'ps', name: 'Pashto' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'pl', name: 'Polish' },
  { code: 'ro', name: 'Romanian' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'el', name: 'Greek' },
];

const LS_KEY = 'lawease-gt-lang';

export default function GlobalLanguageSwitcher() {
  const { theme } = useTheme();
  const { setLanguage: setAppLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [current, setCurrent] = useState(() => localStorage.getItem(LS_KEY) || 'en');

  useEffect(() => {
    GoogleTranslate.init();
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_LANGUAGES;
    return ALL_LANGUAGES.filter(l => l.name.toLowerCase().includes(q) || l.code.toLowerCase().includes(q));
  }, [query]);

  const apply = async (code) => {
    setCurrent(code);
    localStorage.setItem(LS_KEY, code);
    // keep custom i18n in sync for supported languages
    if (["en", "hi", "ta"].includes(code)) {
      setAppLanguage(code);
    }
    await GoogleTranslate.setLanguage(code);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={`inline-flex items-center gap-2 px-3 h-10 rounded-lg font-medium transition ${
          theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
        }`}
        title="Change website language"
      >
        <Languages className="w-5 h-5" />
        <span className="text-sm">{ALL_LANGUAGES.find(l => l.code === current)?.name || 'Language'}</span>
      </button>

      {open && (
        <div
          className={`absolute right-0 mt-2 w-72 rounded-xl border shadow-xl z-50 ${
            theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
          }`}
        >
          <div className="p-2 border-b border-slate-200/20">
            <div className={`flex items-center gap-2 px-2 rounded-md ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`}>
              <Search className="w-4 h-4 opacity-70" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search languages..."
                className={`w-full h-9 bg-transparent outline-none text-sm ${theme === 'dark' ? 'text-slate-200 placeholder-slate-400' : 'text-slate-800 placeholder-slate-500'}`}
              />
            </div>
          </div>
          <div className="max-h-72 overflow-y-auto py-1">
            {results.map(lang => (
              <button
                key={lang.code}
                onClick={() => apply(lang.code)}
                className={`w-full px-3 py-2 flex items-center justify-between text-left text-sm ${
                  theme === 'dark' ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-50 text-slate-800'
                }`}
              >
                <span>{lang.name}</span>
                {current === lang.code && <Check className="w-4 h-4 text-blue-500" />}
              </button>
            ))}
          </div>

          {/* Google widget is rendered once globally in App.jsx */}
        </div>
      )}
    </div>
  );
}
