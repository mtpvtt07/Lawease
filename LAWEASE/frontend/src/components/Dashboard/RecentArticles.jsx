import React from 'react';

const articles = [
  { title: 'How to Resolve Land Disputes Legally', date: '2024-07-10' },
  { title: 'Women’s Rights in Rural India', date: '2024-07-08' },
  { title: 'Understanding Labor Laws', date: '2024-07-05' },
  { title: 'Property Registration Simplified', date: '2024-07-01' },
];

export default function RecentArticles() {
  return (
    <section>
      <h3 className="text-2xl font-bold mb-6">Recent Articles</h3>
      <ul className="divide-y divide-white/10 bg-white/5 rounded-xl shadow">
        {articles.map((a, i) => (
          <li key={i} className="flex justify-between items-center px-6 py-4 hover:bg-white/10 transition">
            <span className="text-white font-medium">{a.title}</span>
            <span className="text-gray-400 text-sm">{a.date}</span>
          </li>
        ))}
      </ul>
    </section>
  );
} 