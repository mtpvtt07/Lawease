import React from 'react';
export default function WelcomeBanner() {
  return (
    <section className="rounded-2xl bg-gradient-to-r from-black via-gray-900 to-gray-800 p-8 shadow-lg flex flex-col md:flex-row items-center justify-between mb-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Welcome back, User!</h2>
        <p className="text-gray-300 text-lg">Your legal dashboard at a glance.</p>
      </div>
      <div className="mt-6 md:mt-0 flex gap-4">
        <button className="px-6 py-2 rounded-lg bg-white text-black font-semibold shadow hover:bg-gray-200 transition">Request a Lawyer</button>
        <button className="px-6 py-2 rounded-lg border border-white text-white font-semibold hover:bg-white hover:text-black transition">New Case</button>
      </div>
    </section>
  );
} 