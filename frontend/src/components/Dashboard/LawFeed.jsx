import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { fetchLegalNews, getTimeAgo, getReadingTime } from '../../services/newsService';
import NewsModal from './NewsModal';

export default function LawFeed() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    setLoading(true);
    try {
      const newsData = await fetchLegalNews(20);
      setArticles(newsData);
    } catch (error) {
      console.error('Failed to load news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedArticle(null), 300);
  };

  const categoryColors = {
    blue: theme === 'dark' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-300',
    purple: theme === 'dark' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-purple-100 text-purple-700 border-purple-300',
    green: theme === 'dark' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-300',
    orange: theme === 'dark' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-orange-100 text-orange-700 border-orange-300',
    pink: theme === 'dark' ? 'bg-pink-500/20 text-pink-400 border-pink-500/30' : 'bg-pink-100 text-pink-700 border-pink-300',
    teal: theme === 'dark' ? 'bg-teal-500/20 text-teal-400 border-teal-500/30' : 'bg-teal-100 text-teal-700 border-teal-300',
    red: theme === 'dark' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-700 border-red-300'
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${
          theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
        }`}>
          Legal News & Updates
        </h2>
        <div className="grid gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`${
              theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'
            } rounded-xl p-6 animate-shimmer`}>
              <div className={`h-4 ${
                theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'
              } rounded w-3/4 mb-4`} />
              <div className={`h-3 ${
                theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'
              } rounded w-full mb-2`} />
              <div className={`h-3 ${
                theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'
              } rounded w-5/6`} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="animate-fade-in">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl md:text-3xl font-bold ${
            theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
          }`}>
            Legal News & Updates
          </h2>
          <button 
            onClick={loadNews}
            className={`px-4 py-2 rounded-lg font-medium transition-smooth ${
              theme === 'dark'
                ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            Refresh →
          </button>
        </div>

        {/* Feed Grid */}
        <div className="grid gap-6">
          {articles.map((article, index) => (
            <article
              key={article.id}
              onClick={() => handleArticleClick(article)}
              className={`${
                theme === 'dark'
                  ? 'bg-slate-800/50 hover:bg-slate-700/50 border-slate-700'
                  : 'bg-white hover:bg-slate-50 border-slate-200'
              } rounded-xl p-6 border card-hover transition-smooth animate-scale-in cursor-pointer`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start gap-4">
                {/* Article Icon/Image */}
                <div className={`${
                  theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'
                } rounded-xl w-16 h-16 flex items-center justify-center text-3xl shrink-0 overflow-hidden`}>
                  {article.image && article.image !== 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80' ? (
                    <img src={article.image} alt="" className="w-full h-full object-cover" onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.textContent = article.category.icon;
                    }} />
                  ) : (
                    article.category.icon
                  )}
                </div>

                {/* Article Content */}
                <div className="flex-1 min-w-0">
                  {/* Category Badge */}
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mb-3 ${
                    categoryColors[article.category.color]
                  }`}>
                    {article.category.name}
                  </span>

                  {/* Title */}
                  <h3 className={`text-lg md:text-xl font-bold mb-2 ${
                    theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
                  }`}>
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className={`text-sm md:text-base mb-4 line-clamp-2 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {article.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className={`flex flex-wrap items-center gap-4 text-xs md:text-sm ${
                    theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
                  }`}>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {getTimeAgo(article.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      {getReadingTime(article.content)}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                      {article.source}
                    </span>
                  </div>
                </div>

                {/* Read More Icon */}
                <button className={`px-4 py-2 rounded-lg font-medium transition-smooth whitespace-nowrap ${
                  theme === 'dark'
                    ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}>
                  Read →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button 
            onClick={loadNews}
            className={`px-8 py-3 rounded-lg font-medium transition-smooth ${
              theme === 'dark'
                ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
            }`}
          >
            Load More Articles
          </button>
        </div>
      </div>

      {/* News Modal */}
      <NewsModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
