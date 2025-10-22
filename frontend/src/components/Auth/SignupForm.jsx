"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { User, Phone, ChevronDown, Shield, AlertCircle, Sun, Moon, ArrowRight } from "lucide-react"

const ROLES = [
  { value: "user", label: "User" },
  { value: "lawyer", label: "Lawyer" },
]

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "ta", label: "Tamil" },
  { value: "te", label: "Telugu" },
  { value: "bn", label: "Bengali" },
  { value: "gu", label: "Gujarati" },
]

export default function SignupForm() {
  const [mobile, setMobile] = useState("")
  const [name, setName] = useState("")
  const [role, setRole] = useState("user")
  const [language, setLanguage] = useState("en")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const navigate = useNavigate()

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!/^\d{10}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number")
      setIsLoading(false)
      return
    }
    if (!name.trim()) {
      setError("Please enter your name")
      setIsLoading(false)
      return
    }

    try {
      // Call backend API to send OTP
      const response = await fetch('http://localhost:8000/api/v1/otp/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send OTP')
      }

      // Store signup data in localStorage to use in OTP verification
      localStorage.setItem('signupData', JSON.stringify({
        mobile,
        fullName: name,
        role,
        preferredLanguage: language
      }))

      // Navigate to OTP page
      navigate('/otp')
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please try again.')
      console.error('Error sending OTP:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* Left Side - Branding (Hidden on mobile, visible on lg+) */}
      <div
        className={`hidden lg:flex lg:w-1/2 xl:w-2/5 flex-col justify-center items-center relative transition-all duration-300 p-8 ${
          darkMode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
            : "bg-gradient-to-br from-gray-100 via-gray-50 to-white"
        }`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div
            className={`absolute inset-0 ${
              darkMode
                ? "bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1)_0%,transparent_70%)]"
                : "bg-[radial-gradient(circle_at_30%_40%,rgba(0,0,0,0.05)_0%,transparent_70%)]"
            }`}
          ></div>
        </div>

        <div className="relative z-10 text-center max-w-md">
          {/* Logo */}
          <div
            className={`w-20 h-20 xl:w-24 xl:h-24 rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-2xl ${
              darkMode ? "bg-white" : "bg-black"
            }`}
          >
            <Shield className={`w-10 h-10 xl:w-12 xl:h-12 ${darkMode ? "text-black" : "text-white"}`} />
          </div>

          {/* Brand Name */}
          <h1 className={`text-4xl xl:text-5xl font-bold mb-4 ${darkMode ? "text-white" : "text-black"}`}>LawEase</h1>
          <p className={`text-lg xl:text-xl mb-12 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Legal Solutions Simplified
          </p>

          {/* Benefits */}
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Join 50,000+ Users</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Connect with Expert Lawyers
              </span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Get Legal Help in Your Language
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div
        className={`flex-1 lg:w-1/2 xl:w-3/5 flex flex-col justify-center items-center relative transition-all duration-300 p-4 sm:p-6 lg:p-8 min-h-screen ${
          darkMode ? "bg-black" : "bg-white"
        }`}
      >
        {/* Mobile Logo (Visible only on mobile) */}
        <div className="lg:hidden mb-8 text-center">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl ${
              darkMode ? "bg-white" : "bg-black"
            }`}
          >
            <Shield className={`w-8 h-8 ${darkMode ? "text-black" : "text-white"}`} />
          </div>
          <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-black"}`}>LawEase</h1>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Legal Solutions Simplified</p>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 w-10 h-10 sm:w-12 sm:h-12 rounded-lg xl:rounded-xl flex items-center justify-center transition-all duration-300 ${
            darkMode ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-black"
          }`}
        >
          {darkMode ? <Sun className="w-5 h-5 sm:w-6 sm:h-6" /> : <Moon className="w-5 h-5 sm:w-6 sm:h-6" />}
        </button>

        {/* Signup Form Container */}
        <div className="w-full max-w-sm sm:max-w-md">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 ${darkMode ? "text-white" : "text-black"}`}
            >
              Create Account
            </h2>
            <p className={`text-sm sm:text-base lg:text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Join LawEase to get started with legal services
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div
              className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg xl:rounded-xl mb-4 sm:mb-6 ${
                darkMode
                  ? "bg-red-900/20 text-red-300 border border-red-800/30"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-xs sm:text-sm">{error}</span>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Mobile Number */}
            <div>
              <label
                className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                Mobile Number
              </label>
              <div className="relative">
                <Phone
                  className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                  maxLength={10}
                  className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 rounded-lg xl:rounded-xl border-2 transition-all duration-200 focus:outline-none text-sm sm:text-base ${
                    darkMode
                      ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-white"
                      : "bg-gray-50 border-gray-200 text-black placeholder-gray-400 focus:border-black"
                  }`}
                  placeholder="9876543210"
                  required
                />
              </div>
            </div>

            {/* Name */}
            <div>
              <label
                className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                Full Name
              </label>
              <div className="relative">
                <User
                  className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 rounded-lg xl:rounded-xl border-2 transition-all duration-200 focus:outline-none text-sm sm:text-base ${
                    darkMode
                      ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-white"
                      : "bg-gray-50 border-gray-200 text-black placeholder-gray-400 focus:border-black"
                  }`}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label
                className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                I am a
              </label>
              <div className={`flex rounded-lg xl:rounded-xl p-1 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
                {ROLES.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`flex-1 py-2 sm:py-3 px-3 sm:px-6 text-xs sm:text-sm font-semibold rounded-md xl:rounded-lg transition-all duration-200 ${
                      role === r.value
                        ? darkMode
                          ? "bg-white text-black shadow-lg"
                          : "bg-black text-white shadow-lg"
                        : darkMode
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-600 hover:text-black"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selection */}
            <div>
              <label
                className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                Preferred Language
              </label>
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={`w-full px-3 sm:px-4 py-3 sm:py-4 rounded-lg xl:rounded-xl border-2 transition-all duration-200 focus:outline-none text-sm sm:text-base appearance-none ${
                    darkMode
                      ? "bg-gray-900 border-gray-700 text-white focus:border-white"
                      : "bg-gray-50 border-gray-200 text-black focus:border-black"
                  }`}
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.value} value={l.value}>
                      {l.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className={`absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 sm:py-4 px-4 sm:px-6 font-semibold rounded-lg xl:rounded-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base mt-6 sm:mt-8 ${
                isLoading ? "opacity-60 cursor-not-allowed" : "hover:scale-[1.02] active:scale-[0.98]"
              } ${darkMode ? "bg-white text-black hover:bg-gray-100" : "bg-black text-white hover:bg-gray-800"}`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5"
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
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 sm:my-8">
            <div className="relative flex items-center">
              <div className={`flex-grow border-t ${darkMode ? "border-gray-800" : "border-gray-200"}`}></div>
              <span className={`flex-shrink mx-4 text-xs sm:text-sm ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                or
              </span>
              <div className={`flex-grow border-t ${darkMode ? "border-gray-800" : "border-gray-200"}`}></div>
            </div>
          </div>

          {/* Social Signup */}
          <button
            type="button"
            className={`w-full flex items-center justify-center gap-3 py-3 sm:py-4 px-4 sm:px-6 rounded-lg xl:rounded-xl border-2 transition-all duration-200 ${
              darkMode
                ? "bg-gray-900 hover:bg-gray-800 border-gray-700 text-white"
                : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-black"
            }`}
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center">
              <span className="text-xs sm:text-sm font-bold text-blue-600">G</span>
            </div>
            <span className="font-medium text-sm sm:text-base">Continue with Google</span>
          </button>

          {/* Login Link */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Already have an account?{" "}
              <a
                href="/login"
                className={`font-medium transition-colors ${
                  darkMode ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"
                } hover:underline`}
              >
                Sign in
              </a>
            </p>
          </div>

          {/* Terms */}
          <div className="mt-4 sm:mt-6 text-center">
            <p className={`text-xs sm:text-sm ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
              By creating an account, you agree to our{" "}
              <a
                href="/terms"
                className={`transition-colors ${
                  darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
                } hover:underline`}
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className={`transition-colors ${
                  darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
                } hover:underline`}
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
