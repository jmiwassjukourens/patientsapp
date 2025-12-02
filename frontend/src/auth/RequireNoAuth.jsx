import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function RequireNoAuth({ children }) {
  const { user } = useAuth();
  if (user) return <Navigate to="/agenda" replace />;
  return children;
}
