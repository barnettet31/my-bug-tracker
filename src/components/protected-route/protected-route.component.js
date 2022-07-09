import { Navigate } from "react-router-dom";

import { useAuth } from "../../services/authentication/authentication.context";
export const ProtectedRoute = ({ children }) => {
  const { userToken } = useAuth();

  if (!userToken) return <Navigate to="/login" replace />;
  return children;
};
