import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Sun, Moon, ArrowRight } from 'lucide-react'

export default function OtpForm() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [timer, setTimer] = useState(30)
  const [loading, setLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [signupData, setSignupData] = useState(null)
  const inputs = useRef([])
  const navigate = useNavigate()

  // Load theme preference and signup data from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }

    // Get signup data from localStorage
    const data = localStorage.getItem('signupData')
    if (data) {
      setSignupData(JSON.parse(data))
    } else {
      // If no signup data, redirect to signup page
      navigate('/signup')
    }
  }, [navigate]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  const handleChange = (i, v) => {
    if (!/^[0-9]?$/.test(v)) return
    const newOtp = [...otp]
    newOtp[i] = v
    setOtp(newOtp)
    if (v && i < 5) {
      inputs.current[i + 1]?.focus()
    }
  }

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      inputs.current[i - 1]?.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otpValue = otp.join('')
    
    if (otpValue.length !== 6) {
      setError('Please enter the 6-digit OTP')
      return
    }

    if (!signupData) {
      setError('Signup data not found. Please try signing up again.')
      return
    }

    setError('')
    setLoading(true)

    try {
      // Call backend API to verify OTP
      const response = await fetch('http://localhost:8000/api/v1/otp/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: signupData.mobile,
          fullName: signupData.fullName,
          role: signupData.role,
          preferredLanguage: signupData.preferredLanguage,
          otp: otpValue
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Invalid OTP')
      }

      // Store the token
      localStorage.setItem('authToken', data.data.token)
      
      // Clear signup data
      localStorage.removeItem('signupData')

      // Navigate to dashboard
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Failed to verify OTP. Please try again.')
      console.error('Error verifying OTP:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (timer === 0 && signupData) {
      try {
        const response = await fetch('http://localhost:8000/api/v1/otp/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mobile: signupData.mobile }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to resend OTP')
        }

        setTimer(30)
        setOtp(['', '', '', '', '', '']) // Clear OTP input
        setError('')
      } catch (err) {
        setError(err.message || 'Failed to resend OTP')
        console.error('Error resending OTP:', err)
      }
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
      darkMode 
        ? 'bg-linear-to-br from-gray-900 via-black to-gray-900' 
        : 'bg-linear-to-br from-blue-50 via-white to-green-50'
    }`}>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className={`fixed top-6 right-6 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg z-50 ${
          darkMode 
            ? 'bg-gray-800 hover:bg-gray-700 text-white' 
            : 'bg-white hover:bg-gray-50 text-black border border-gray-200'
        }`}
        aria-label="Toggle theme"
      >
        {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>

      <div className="w-full max-w-md p-8 m-4">
        <form 
          onSubmit={handleSubmit} 
          className={`p-8 rounded-xl shadow-2xl space-y-6 transition-colors duration-300 ${
            darkMode 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          }`}
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl ${
                darkMode ? 'bg-white' : 'bg-black'
              }`}
            >
              <Shield className={`w-8 h-8 ${darkMode ? 'text-black' : 'text-white'}`} />
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
              OTP Verification
            </h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Enter the 6-digit code sent to your mobile
            </p>
          </div>

          {/* OTP Input */}
          <div className="flex justify-center gap-2 mb-6">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={el => inputs.current[i] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                className={`w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl font-bold rounded-lg border-2 transition-all focus:outline-none focus:ring-2 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500' 
                    : 'bg-gray-50 border-gray-300 text-black focus:ring-blue-400 focus:border-blue-400'
                }`}
                autoFocus={i === 0}
              />
            ))}
          </div>

          {error && (
            <div className={`p-3 rounded-lg text-sm text-center border ${
              darkMode 
                ? 'bg-red-500/10 border-red-500 text-red-400' 
                : 'bg-red-50 border-red-300 text-red-600'
            }`}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl ${
              darkMode 
                ? 'bg-white text-black hover:bg-gray-100 disabled:bg-gray-300' 
                : 'bg-black text-white hover:bg-gray-800 disabled:bg-gray-400'
            } disabled:cursor-not-allowed`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Verifying...
              </>
            ) : (
              <>
                Verify & Continue
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Resend OTP */}
          <div className={`text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Didn&apos;t receive OTP?{' '}
            <button 
              type="button" 
              onClick={handleResend} 
              disabled={timer > 0} 
              className={`font-medium transition-colors ${
                darkMode 
                  ? 'text-white hover:text-gray-200 disabled:text-gray-600' 
                  : 'text-black hover:text-gray-700 disabled:text-gray-400'
              } hover:underline disabled:no-underline disabled:cursor-not-allowed`}
            >
              Resend OTP{timer > 0 ? ` (${timer}s)` : ''}
            </button>
          </div>

          {/* Back to signup */}
          <div className={`text-center text-sm pt-4 border-t ${
            darkMode ? 'text-gray-400 border-gray-700' : 'text-gray-600 border-gray-200'
          }`}>
            Wrong number?{' '}
            <a 
              href="/signup" 
              className={`font-medium ${
                darkMode 
                  ? 'text-white hover:text-gray-200' 
                  : 'text-black hover:text-gray-700'
              }`}
            >
              Go back
            </a>
          </div>
        </form>
      </div>
    </div>
  )
} 