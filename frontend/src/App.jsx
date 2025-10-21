import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MainPage from "./pages/MainPage";
import Footer from "./components/footer";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

function App() {
  const hideFooter = window.location.pathname === "/dashboard";

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

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
    </>
  );
}

export default App;
