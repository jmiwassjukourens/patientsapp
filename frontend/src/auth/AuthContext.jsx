import { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "../api/apiFetch";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/useToast.jsx"; 
import { notificationsService } from "../services/notificationsService.js"; 



const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userData = sessionStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
  
      notificationsService.loadNotifications().catch(err => {
        console.error("Falló cargar notificaciones al iniciar:", err);
      });
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

      toast.info(`Bienvenido ${data.username} ✅`);

      try {
        const notis = await notificationsService.loadNotifications();
     
        if (Array.isArray(notis) && notis.length > 0) {
          const unread = notis.filter(n => !n.leida).length;
          if (unread > 0) {
            toast.info(`Tenés ${unread} notificación(es) sin leer 🔔`);
          }
        }
      } catch (err) {
        console.error("Error al cargar notificaciones después del login:", err);
      }

   
      navigate("/agenda");

    } catch (err) {
      toast.error("Credenciales inválidas o error en el servidor ❌");
      console.error(err);
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");



    toast.info("Sesión cerrada correctamente 👋");

    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}