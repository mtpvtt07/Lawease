import React from 'react';
import { Scale, Users, Gavel, Shield, Heart, Home } from 'lucide-react';

const categories = [
  { icon: <Scale className="w-8 h-8" />, title: 'Land Disputes' },
  { icon: <Users className="w-8 h-8" />, title: 'Family Matters' },
  { icon: <Gavel className="w-8 h-8" />, title: 'Criminal Law' },
  { icon: <Shield className="w-8 h-8" />, title: 'Women Safety' },
  { icon: <Heart className="w-8 h-8" />, title: 'Labor Rights' },
  { icon: <Home className="w-8 h-8" />, title: 'Property Issues' },
];

export default function LegalCategories() {
  return (
    <section>
      <h3 className="text-2xl font-bold mb-6">Legal Categories</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((cat, i) => (
          <div key={i} className="flex flex-col items-center bg-white/5 rounded-xl p-6 shadow hover:bg-white/10 transition cursor-pointer">
            <div className="mb-3 text-white">{cat.icon}</div>
            <div className="font-semibold text-lg text-white text-center">{cat.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
} 