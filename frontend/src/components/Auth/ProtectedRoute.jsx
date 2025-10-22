import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Check if the user is authenticated
  const isAuthenticated = localStorage.getItem("authToken"); 
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
