import React, { useState, useRef } from 'react'
import { useTheme } from '../../contexts/ThemeContext'

export default function OtpForm() {
  const { darkMode } = useTheme()
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
    <form onSubmit={handleSubmit} className={`rounded-xl shadow-lg p-8 w-full max-w-md space-y-6 transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-800 shadow-2xl' 
        : 'bg-white'
    }`}>
      <h2 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
        darkMode ? 'text-white' : 'text-gray-800'
      }`}>OTP Verification</h2>
      <div className="flex justify-center gap-2 mb-4">
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
            className={`w-12 h-12 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-300 ${
              darkMode 
                ? 'border-gray-600 bg-gray-700 text-white focus:ring-blue-400' 
                : 'border-gray-300 focus:ring-blue-400'
            }`}
            autoFocus={i === 0}
          />
        ))}
      </div>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all" disabled={loading}>
        {loading ? 'Verifying...' : 'Verify & Continue'}
      </button>
      <div className={`text-center text-sm mt-2 transition-colors duration-300 ${
        darkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        Didn&apos;t receive OTP?{' '}
        <button type="button" onClick={handleResend} disabled={timer > 0} className="text-blue-600 hover:underline font-medium disabled:opacity-50">
          Resend OTP{timer > 0 ? ` (${timer}s)` : ''}
        </button>
      </div>
    </div>
  )
} 