import React from 'react'
import SignupForm from '../components/Auth/SignupForm'
import { useTheme } from '../contexts/ThemeContext'

export default function SignupPage() {
  const { darkMode } = useTheme()
  
  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700' 
        : 'bg-gradient-to-br from-blue-900 via-blue-400 to-green-200'
    }`}>
      <SignupForm />
    </div>
  )
} 