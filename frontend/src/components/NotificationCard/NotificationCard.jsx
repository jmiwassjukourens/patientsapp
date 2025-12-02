import styles from "./NotificationCard.module.css";
import { notificationsService } from "../../services/notificationsService";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";

export default function NotificationCard({ notification, onDelete }) {
  const { id, mensaje, tipo, leida } = notification;

  const getColor = () => {
    switch (tipo) {
      case "financiera": return "#FFB74D";
      case "sesion": return "#64B5F6";
      case "analitica": return "#81C784";
      case "cliente": return "#BA68C8";
      default: return "#B0BEC5";
    }
  };

  const handleDelete = () => {
    if (typeof onDelete === "function") {
      onDelete(); // usa el callback provisto por la página (abre modal)
    } else {
      // Comportamiento por defecto: borrar directamente (si no se pasó onDelete)
      notificationsService.deleteNotification(id);
    }
  };

  return (
    <motion.div
      className={`${styles.card} ${!leida ? styles.unread : ""}`}
      style={{
        background: `linear-gradient(90deg, ${getColor()}20 0%, #ffffff 40%)`,
        borderLeft: `6px solid ${getColor()}`
      }}
      whileHover={{ scale: 1.02 }}
    >
      <p className={styles.text}>{mensaje}</p>

      <div className={styles.actions}>
        {!leida && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => notificationsService.markAsRead(id)}
            className={styles.btnRead}
            aria-label="Marcar como leída"
          >
            <FaCheckCircle /> <span>Marcar como leída</span>
          </motion.button>
        )}

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleDelete}
          className={styles.btnDelete}
          aria-label="Eliminar notificación"
        >
          <FaTrashAlt /> <span>Eliminar</span>
        </motion.button>
      </div>
    </motion.div>
  );
}