import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OtpPage from './pages/OtpPage';
import MainPage from './pages/MainPage';
import Footer from './components/footer';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { Routes, Route } from 'react-router-dom';

function AppContent() {
  const { darkMode } = useTheme();

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>

      {/* Footer only on non-dashboard pages */}
      {!hideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
