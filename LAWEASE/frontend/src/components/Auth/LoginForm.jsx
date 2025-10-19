"use client"

import { useState } from "react"
import { Mail, Lock, ArrowRight, Shield, AlertCircle, Sun, Moon, Eye, EyeOff, Phone } from 'lucide-react'

export default function FullScreenLogin() {
  const [authMethod, setAuthMethod] = useState("email")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (authMethod === "email") {
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        setError("Please enter a valid email address")
        setIsLoading(false)
        return
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters")
        setIsLoading(false)
        return
      }
    } else {
      if (!/^\d{10}$/.test(phone)) {
        setError("Please enter a valid 10-digit mobile number")
        setIsLoading(false)
        return
      }
    }

    setTimeout(() => {
      window.location.href = "/dashboard"
      setIsLoading(false)
    }, 1500)
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
          <h1
            className={`text-4xl xl:text-5xl font-bold mb-4 ${darkMode ? "text-white" : "text-black"}`}
          >
            LawEase
          </h1>
          <p
            className={`text-lg xl:text-xl mb-12 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Legal Solutions Simplified
          </p>

          {/* Stats */}
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                50,000+ Happy Clients
              </span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                1,200+ Expert Lawyers
              </span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                99.2% Success Rate
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
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

        {/* Login Form Container */}
        <div className="w-full max-w-sm sm:max-w-md">
          {/* Header */}
          <div className="mb-6 sm:mb-8 lg:mb-10">
            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 ${darkMode ? "text-white" : "text-black"}`}
            >
              Welcome Back
            </h2>
            <p className={`text-sm sm:text-base lg:text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Sign in to access your legal dashboard
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

          {/* Auth Method Toggle */}
          <div className={`flex rounded-lg xl:rounded-xl mb-6 sm:mb-8 p-1 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
            <button
              type="button"
              onClick={() => setAuthMethod("email")}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-6 text-xs sm:text-sm font-semibold rounded-md xl:rounded-lg transition-all duration-200 ${
                authMethod === "email"
                  ? darkMode
                    ? "bg-white text-black shadow-lg"
                    : "bg-black text-white shadow-lg"
                  : darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-black"
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setAuthMethod("phone")}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-6 text-xs sm:text-sm font-semibold rounded-md xl:rounded-lg transition-all duration-200 ${
                authMethod === "phone"
                  ? darkMode
                    ? "bg-white text-black shadow-lg"
                    : "bg-black text-white shadow-lg"
                  : darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-black"
              }`}
            >
              Phone
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Email/Phone Input */}
            <div>
              <label
                className={`block text-xs sm:text-sm font-medium mb-2 sm:mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                {authMethod === "email" ? "Email Address" : "Mobile Number"}
              </label>
              <div className="relative">
                {authMethod === "email" ? (
                  <>
                    <Mail
                      className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 rounded-lg xl:rounded-xl border-2 transition-all duration-200 focus:outline-none text-sm sm:text-base ${
                        darkMode
                          ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-white"
                          : "bg-gray-50 border-gray-200 text-black placeholder-gray-400 focus:border-black"
                      }`}
                      placeholder="your@email.com"
                      required
                    />
                  </>
                ) : (
                  <>
                    <Phone
                      className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      maxLength={10}
                      className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 rounded-lg xl:rounded-xl border-2 transition-all duration-200 focus:outline-none text-sm sm:text-base ${
                        darkMode
                          ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-white"
                          : "bg-gray-50 border-gray-200 text-black placeholder-gray-400 focus:border-black"
                      }`}
                      placeholder="9876543210"
                      required
                    />
                  </>
                )}
              </div>
            </div>

            {/* Password Input (only for email) */}
            {authMethod === "email" && (
              <div>
                <label
                  className={`block text-xs sm:text-sm font-medium mb-2 sm:mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 rounded-lg xl:rounded-xl border-2 transition-all duration-200 focus:outline-none text-sm sm:text-base ${
                      darkMode
                        ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-white"
                        : "bg-gray-50 border-gray-200 text-black placeholder-gray-400 focus:border-black"
                    }`}
                    placeholder="••••••••"
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 ${
                      darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Forgot Password */}
            {authMethod === "email" && (
              <div className="text-right">
                <a
                  href="/forgot-password"
                  className={`text-xs sm:text-sm transition-colors ${
                    darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
                  } hover:underline`}
                >
                  Forgot Password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 sm:py-4 px-4 sm:px-6 font-semibold rounded-lg xl:rounded-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base ${
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
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Don't have an account?{" "}
              <a
                href="/signup"
                className={`font-medium transition-colors ${
                  darkMode ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"
                } hover:underline`}
              >
                Create account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
