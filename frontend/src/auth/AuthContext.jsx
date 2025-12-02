import { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "../api/apiFetch";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userData = sessionStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    setLoading(false); 
  }, []);

  const login = async (username, password) => {
    try {
      const data = await apiFetch("login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.username));

      setUser(data.username);

      window.location.href = "/agenda";
    } catch (err) {
      alert("Invalid credentials or server error");
      console.error(err);
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
