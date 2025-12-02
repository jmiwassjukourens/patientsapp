import { useState,useEffect } from "react";
import { useAuth } from "../AuthContext";
import styles from "./LoginPage.module.css";
import logo from "../../assets/logo.png";

function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className={styles.container}>
      {!isMobile && (
        <div className={styles.left}>
          <img src={logo} alt="Logo Clínica" className={styles.logo} />
        </div>
      )}

      <div className={styles.right}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>Iniciar Sesión</h2>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
