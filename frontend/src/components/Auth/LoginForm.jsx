import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Eye, EyeOff, Sun, Moon } from 'lucide-react';

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const navigate = useNavigate();

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      setIsLoading(false);
      return;
    }

    // Simulate login API
    setTimeout(() => {
      localStorage.setItem("authToken", "demo-token");
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

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
          <div className="text-center mb-6">
            <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
              Login
            </h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Welcome back to LawEase
            </p>
          </div>

          {error && (
            <div className={`p-3 rounded-lg text-sm border ${
              darkMode 
                ? 'bg-red-500/10 border-red-500 text-red-400' 
                : 'bg-red-50 border-red-300 text-red-600'
            }`}>
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className={`text-sm font-medium block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Email
            </label>
            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                darkMode ? 'text-gray-500' : 'text-gray-400'
              }`}/>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full pl-11 pr-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500' 
                    : 'bg-gray-50 border-gray-300 text-black placeholder-gray-500 focus:ring-blue-400 focus:bg-white'
                }`}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={`text-sm font-medium block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Password
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                darkMode ? 'text-gray-500' : 'text-gray-400'
              }`}/>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`w-full pl-11 pr-12 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500' 
                    : 'bg-gray-50 border-gray-300 text-black placeholder-gray-500 focus:ring-blue-400 focus:bg-white'
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors ${
                  darkMode 
                    ? 'text-gray-400 hover:text-gray-300' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl ${
              darkMode 
                ? 'bg-white text-black hover:bg-gray-100 disabled:bg-gray-300' 
                : 'bg-black text-white hover:bg-gray-800 disabled:bg-gray-400'
            } disabled:cursor-not-allowed`}
          >
            {isLoading ? (
              "Signing in..."
            ) : (
              <>
                Sign In
                <ArrowRight className="w-5 h-5"/>
              </>
            )}
          </button>

          <div className={`text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Don't have an account?{' '}
            <a 
              href="/signup" 
              className={`font-medium ${
                darkMode 
                  ? 'text-white hover:text-gray-200' 
                  : 'text-black hover:text-gray-700'
              }`}
            >
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
