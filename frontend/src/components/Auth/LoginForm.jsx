import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function FullScreenLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold">Login</h2>

        {error && <p className="text-red-500">{error}</p>}

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full pl-10 p-2 rounded text-black"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full pl-10 pr-10 p-2 rounded text-black"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 bg-white text-black rounded ${isLoading ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-100"}`}
        >
          {isLoading ? "Signing in..." : <>Sign In <ArrowRight className="inline w-4 h-4 ml-2"/></>}
        </button>
      </form>
    </div>
  );
}
