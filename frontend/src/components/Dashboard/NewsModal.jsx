import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { getTimeAgo, getReadingTime } from '../../services/newsService';

export default function NewsModal({ article, isOpen, onClose }) {
  const { theme } = useTheme();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !article) return null;

  const categoryColors = {
    blue: theme === 'dark' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-300',
    purple: theme === 'dark' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-purple-100 text-purple-700 border-purple-300',
    green: theme === 'dark' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-300',
    orange: theme === 'dark' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-orange-100 text-orange-700 border-orange-300',
    pink: theme === 'dark' ? 'bg-pink-500/20 text-pink-400 border-pink-500/30' : 'bg-pink-100 text-pink-700 border-pink-300',
    teal: theme === 'dark' ? 'bg-teal-500/20 text-teal-400 border-teal-500/30' : 'bg-teal-100 text-teal-700 border-teal-300',
    red: theme === 'dark' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-700 border-red-300'
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className={`absolute inset-0 ${
        theme === 'dark' ? 'bg-black/80' : 'bg-black/50'
      } backdrop-blur-sm`} />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-scale-in ${
          theme === 'dark' ? 'bg-slate-800' : 'bg-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`sticky top-4 right-4 float-right z-10 w-10 h-10 rounded-full flex items-center justify-center transition-smooth ${
            theme === 'dark'
              ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Article Image */}
        {article.image && (
          <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-t-2xl">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        {/* Article Content */}
        <div className="p-6 md:p-8">
          {/* Category Badge */}
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mb-4 ${
            categoryColors[article.category.color]
          }`}>
            {article.category.icon} {article.category.name}
          </span>

          {/* Title */}
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${
            theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
          }`}>
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className={`flex flex-wrap items-center gap-4 mb-6 pb-6 border-b ${
            theme === 'dark' ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-600'
          }`}>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm">{article.author}</span>
            </div>

            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <span className="text-sm">{article.source}</span>
            </div>

            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">{getTimeAgo(article.publishedAt)}</span>
            </div>

            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-sm">{getReadingTime(article.content)}</span>
            </div>
          </div>

          {/* Excerpt */}
          <p className={`text-lg md:text-xl mb-6 font-medium ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
          }`}>
            {article.excerpt}
          </p>

          {/* Full Content */}
          <div className={`prose prose-lg max-w-none ${
            theme === 'dark' ? 'prose-invert' : ''
          }`}>
            <p className={`text-base md:text-lg leading-relaxed whitespace-pre-line ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {article.content}
            </p>
          </div>

          {/* Read Full Article Button */}
          {article.url && article.url !== '#' && (
            <div className="mt-8 pt-6 border-t ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-smooth ${
                  theme === 'dark'
                    ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                Read Full Article on {article.source}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
