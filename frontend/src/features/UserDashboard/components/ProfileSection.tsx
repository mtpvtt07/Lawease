import React from "react";

const ProfileSection: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full md:w-1/3 flex flex-col items-center text-center animate-fade-in">
      <img
        src="https://via.placeholder.com/100"
        alt="User"
        className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-primary-light"
      />
      <h2 className="text-xl font-semibold text-dark-text">Ramesh Kumar</h2>
      <p className="text-gray-500 mb-4">LawEase User</p>

      <div className="text-sm text-gray-600 mb-6 space-y-1">
        <p>Email: jmaille@hosconer.com</p>
        <p>Phone: 320872452524</p>
        <p>Alwar, Rajasthan</p>
      </div>

      <button className="bg-primary hover:bg-teal-600 text-white px-5 py-2 rounded-xl transition shadow-md">
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileSection;
