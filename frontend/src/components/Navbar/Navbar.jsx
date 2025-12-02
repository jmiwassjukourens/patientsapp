import { useState,useEffect } from "react";
import { Link,useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth } from "../../auth/AuthContext";
import logonav from "../../assets/logoNav.png";
import { notificationsService } from "../../services/notificationsService";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const sub = notificationsService.getNotifications().subscribe((n) => {
      setUnreadCount(n.filter((notif) => !notif.leida).length);
    });
    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    if (location.pathname.startsWith("/reportes")) {
      setSubmenuOpen(true);
    } else {
      setSubmenuOpen(false);
    }
  }, [location.pathname]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSubmenu = () => setSubmenuOpen(!submenuOpen);

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to="/sesiones">
          <img src={logonav} alt="Logo" className={styles.logo} />
        </Link>
      </div>

      {user && (
        <nav className={`${styles.nav} ${menuOpen ? styles.active : ""}`}>
          <button className={styles.menuToggle} onClick={toggleMenu}>
            {menuOpen ? "✖" : "☰"}
          </button>

          <ul className={styles.navList}>
            <li><Link to="/agenda" onClick={toggleMenu}>Agenda</Link></li>
            <li><Link to="/sesiones" onClick={toggleMenu}>Sesiones</Link></li>
            <li>
              <Link to="/reportes/anual" onClick={toggleMenu}>Dashboard</Link>
            </li>
            <li>
              <Link to="/notificaciones" onClick={toggleMenu}>
                Notificaciones{" "}
                {unreadCount > 0 && (
                  <span className={styles.notificationBadge}>
                    {unreadCount}
                  </span>
                )}
              </Link>
            </li>

            <li><Link to="/pacientes" onClick={toggleMenu}>Mis Pacientes</Link></li>
            <li>
              <button className={styles.logout} onClick={logout}>
                Cerrar sesión
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}