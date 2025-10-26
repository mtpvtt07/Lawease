import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import OtpPage from "./pages/OtpPage";
import MainPage from "./pages/MainPage";
import Footer from "./components/footer";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import GoogleTranslate from "./components/GoogleTranslate";
import EditProfilePage from "./features/UserDashboard/components/EditProfilePage";
import React, { useState } from "react";

function App() {
  const hideFooter = window.location.pathname === "/dashboard";

  // Initialize Google Translate globally
  useEffect(() => {
    GoogleTranslate.init();
    
    return () => {
      GoogleTranslate.cleanup();
    };
  }, []);

  // *** USE STATE, NOT CONSTANT ***
  const [user, setUser] = useState({
    name: "Ramesh Kumar",
    role: "LawEase User",
    email: "jmaille@hosconer.com",
    phone: "320872452524",
    location: "Alwar, Rajasthan",
    avatarUrl: undefined,
  });

  const mockSolutions = [
    { title: "Land Dispute Resolution Act", category: "Property Law" },
    { title: "FIR Filing Process", category: "Criminal Law" },
  ];

  const mockConsultations = [
    {
      name: "Adv. Priya Sharma",
      license: "JoM Fia M 8n 115 2015",
      status: "Completed",
      color: "bg-green-100 text-green-700",
    },
    {
      name: "Adv. Anil Gupta",
      license: "JoM Fia M 8n 215 2012",
      status: "Scheduled",
      color: "bg-yellow-100 text-yellow-700",
    },
  ];

  return (
    <ThemeProvider>
      <LanguageProvider>
        {/* Global Google Translate Container (off-screen via CSS) */}
        <div id="google_translate_element" />
        
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/otp" element={<OtpPage />} />

          {/* Protected dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Footer only on non-dashboard pages */}
        {!hideFooter && <Footer />}
      </LanguageProvider>
    </ThemeProvider>
  );
}
export default App;
