"use client"

import { useState, useEffect } from "react"
import { useTheme } from "../../contexts/ThemeContext"
import { useLanguage } from "../../contexts/LanguageContext"

export default function WelcomeBanner() {
  const { theme } = useTheme()
  const { t } = useLanguage()
  const [userName, setUserName] = useState("")
  const [greeting, setGreeting] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // Get user info from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    setUserName(user.fullName || "User")

    // Set greeting based on time
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good Morning")
    else if (hour < 17) setGreeting("Good Afternoon")
    else setGreeting("Good Evening")

    // Update time every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="relative overflow-hidden rounded-3xl">
      <div
        className={`absolute inset-0 ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
            : "bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50"
        }`}
      />

      <div
        className={`relative backdrop-blur-2xl p-8 md:p-12 lg:p-16 border ${
          theme === "dark" ? "border-slate-700/50 bg-slate-900/40" : "border-slate-200/60 bg-white/40"
        }`}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-400/5 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="mb-8 md:mb-10">
            <div className="flex items-baseline gap-3 mb-3">
              <h1
                className={`text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight ${
                  theme === "dark" ? "text-slate-100" : "text-slate-900"
                }`}
              >
                {greeting}
              </h1>
              <span className="text-4xl md:text-5xl">👋</span>
            </div>
            <p className={`text-xl md:text-2xl font-semibold ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>
              Welcome back, {userName}
            </p>
            <p className={`text-base md:text-lg mt-2 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
              {t("welcome")} to your legal dashboard
            </p>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-6 md:gap-8 pt-8 border-t ${
              theme === "dark" ? "border-slate-700/50" : "border-slate-200/50"
            }`}
          >
            {/* Date Card */}
            <div className="flex items-center gap-4 flex-1">
              <div className={`p-3 rounded-xl ${theme === "dark" ? "bg-blue-500/10" : "bg-blue-100/60"}`}>
                <svg
                  className={`w-6 h-6 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p
                  className={`text-xs font-semibold uppercase tracking-wide ${
                    theme === "dark" ? "text-slate-500" : "text-slate-500"
                  }`}
                >
                  Date
                </p>
                <p className={`text-lg font-semibold ${theme === "dark" ? "text-slate-100" : "text-slate-900"}`}>
                  {formattedDate}
                </p>
              </div>
            </div>

            {/* Time Card */}
            <div className="flex items-center gap-4 flex-1">
              <div className={`p-3 rounded-xl ${theme === "dark" ? "bg-slate-500/10" : "bg-slate-200/60"}`}>
                <svg
                  className={`w-6 h-6 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p
                  className={`text-xs font-semibold uppercase tracking-wide ${
                    theme === "dark" ? "text-slate-500" : "text-slate-500"
                  }`}
                >
                  Time
                </p>
                <p className={`text-lg font-semibold ${theme === "dark" ? "text-slate-100" : "text-slate-900"}`}>
                  {formattedTime}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
