import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MainPage from './pages/MainPage';
import OtpPage from './pages/OtpPage';
import Footer from './components/footer';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<MainPage />} />
        <Route path="/otp" element={<OtpPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
