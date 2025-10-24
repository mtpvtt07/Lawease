import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserDashboardPage from "./features/UserDashboard/pages/UserDashboardPage";
import ProfileSection from "./features/UserDashboard/components/ProfileSection";
import SavedSolutions from "./features/UserDashboard/components/SavedSolutions";
import ConsultationHistory from "./features/UserDashboard/components/ConsultationHistory";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Dashboard main route */}
        <Route path="/dashboard" element={<UserDashboardPage />}>
          <Route path="profile" element={<ProfileSection />} />
          <Route path="saved" element={<SavedSolutions />} />
          <Route path="history" element={<ConsultationHistory />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
