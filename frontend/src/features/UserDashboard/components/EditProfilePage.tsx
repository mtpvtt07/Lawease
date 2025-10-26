import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Match this type to the full user shape in App.jsx
type UserProfile = {
  name: string;
  role: string;         // Include if it exists in parent/app state
  email: string;
  phone: string;
  location: string;
  avatarUrl?: string;
};

interface EditProfilePageProps {
  user: UserProfile;
  onSave: (updatedUser: UserProfile) => void;
}

const EditProfilePage: React.FC<EditProfilePageProps> = ({ user, onSave }) => {
  const navigate = useNavigate();

  // Initialize with all fields to be updated
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [location, setLocation] = useState(user.location); // "address" → "location"
  // Add for avatarUrl if you want image uploading too

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Preserve all fields, including non-edited ones like role and avatarUrl!
    onSave({
      ...user, // Keeps role, avatarUrl, etc
      name,
      email,
      phone,
      location,
    });
    navigate("/dashboard/profile");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-dark-bg rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-white">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1 text-white">Name</label>
          <input
            type="text"
            className="w-full p-2 border-gray-300 rounded"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1 text-white">Email</label>
          <input
            type="email"
            className="w-full p-2 border-gray-300 rounded"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1 text-white">Phone</label>
          <input
            type="tel"
            className="w-full p-2 border-gray-300 rounded"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1 text-white">Address</label>
          <input
            type="text"
            className="w-full p-2 border-gray-300 rounded"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-teal-600 text-white px-5 py-2 rounded-xl transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;
