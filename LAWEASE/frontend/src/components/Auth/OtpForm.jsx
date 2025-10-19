import React, { useState, useRef } from 'react'

export default function OtpForm() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [timer, setTimer] = useState(30)
  const [loading, setLoading] = useState(false)
  const inputs = useRef([])

  React.useEffect(() => {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (otp.join('').length !== 6) {
      setError('Please enter the 6-digit OTP')
      return
    }
    setError('')
    setLoading(true)
    // TODO: Verify OTP logic here
    setTimeout(() => {
      setLoading(false)
      window.location.href = '/dashboard'
    }, 1200)
  }

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30)
      // TODO: Resend OTP logic here
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">OTP Verification</h2>
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
            className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoFocus={i === 0}
          />
        ))}
      </div>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all" disabled={loading}>
        {loading ? 'Verifying...' : 'Verify & Continue'}
      </button>
      <div className="text-center text-sm text-gray-600 mt-2">
        Didn&apos;t receive OTP?{' '}
        <button type="button" onClick={handleResend} disabled={timer > 0} className="text-blue-600 hover:underline font-medium disabled:opacity-50">
          Resend OTP{timer > 0 ? ` (${timer}s)` : ''}
        </button>
      </div>
    </form>
  )
} 