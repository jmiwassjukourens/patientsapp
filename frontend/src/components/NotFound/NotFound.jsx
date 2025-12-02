import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFound() {
    
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/sesiones"); 
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.content}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.errorMessage}>Página no encontrada</h2>
        <p className={styles.errorDescription}>
          Lo sentimos, pero la página que buscas no existe o fue movida.
        </p>

        <div className={styles.buttons}>
          <button className={`${styles.btn} ${styles.primary}`} onClick={goHome}>
            Volver al inicio
          </button>
          <button className={`${styles.btn} ${styles.secondary}`} onClick={goBack}>
            Regresar
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
