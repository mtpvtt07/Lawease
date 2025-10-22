import DashboardNavbar from "../components/DashboardNavbar";
import WelcomeBanner from "../components/Dashboard/WelcomeBanner";
import QuickAccessPanel from "../components/Dashboard/QuickAccessPanel";
import LegalCategories from "../components/Dashboard/LegalCategories";
import RecentArticles from "../components/Dashboard/RecentArticles";

export default function MainPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col pt-20">
      {/* Dashboard Navbar */}
      <DashboardNavbar />

      {/* Main content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 space-y-10">
        <WelcomeBanner />
        <QuickAccessPanel />
        <LegalCategories />
        <RecentArticles />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-gray-400 text-sm">
        © 2023 LawEase. All rights reserved.
      </footer>
    </div>
  );
}
