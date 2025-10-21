import React from 'react'
import HeroSection from '../components/HeroSection'

export default function LandingPage({ darkMode, toggleDarkMode }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-400 to-green-200 flex flex-col relative overflow-x-hidden">
      <HeroSection darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {/* Other sections (Legal Categories, Videos, etc.) will go here */}
    </main>
  )
} 