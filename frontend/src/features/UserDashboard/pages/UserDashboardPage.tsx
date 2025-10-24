import React from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const UserDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const sections = [
    { title: "Profile Management", path: "/dashboard/profile" },
    { title: "Saved Solutions", path: "/dashboard/saved" },
    { title: "Consultation History", path: "/dashboard/history" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-light via-light-bg to-white flex flex-col items-center py-10 px-4 animate-gradient-move">
      <div className="max-w-6xl w-full">
        <h1 className="text-3xl font-bold mb-2 text-dark-text">
          My LawEase Dashboard
        </h1>
        <p className="text-gray-600 mb-8">
          Welcome back, <span className="font-medium">Ramesh Kumar</span>.
        </p>

        {/* Dashboard navigation cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {sections.map((section) => {
            const isActive = location.pathname === section.path;
            return (
              <div
                key={section.title}
                onClick={() => navigate(section.path)}
                className={`cursor-pointer rounded-2xl p-6 shadow-md transition-all transform hover:scale-105 ${
                  isActive
                    ? "bg-primary text-white shadow-lg"
                    : "bg-white text-dark-text hover:bg-primary-light"
                }`}
              >
                <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                <p className="text-sm opacity-80">
                  View and manage your {section.title.toLowerCase()}.
                </p>
              </div>
            );
          })}
        </div>

        {/* Display selected section content here */}
        <div className="bg-white shadow-lg rounded-2xl p-6 animate-fade-in">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
