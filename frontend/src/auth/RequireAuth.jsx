import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function RequireAuth({ children }) {
  const { user, loading } = useAuth();


  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h3>Loading...</h3>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;


  return children;
}
