import { useEffect, useState } from "react";
import styles from "./NotificationsPage.module.css";
import NotificationCard from "../../components/NotificationCard/NotificationCard";
import { notificationsService } from "../../services/notificationsService";
import ConfirmModal from "../../components/Modals/ConfirmModal/ConfirmModal"; 
import { motion } from "framer-motion";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [modalConfig, setModalConfig] = useState({
    show: false,
    title: "",
    message: "",
    confirmText: "Confirmar",
    confirmColor: "primary",
    onConfirm: () => {},
  });

  useEffect(() => {
    const sub = notificationsService.getNotifications().subscribe(setNotifications);
    return () => sub.unsubscribe();
  }, []);

  const openConfirmModal = (config) => setModalConfig({ ...config, show: true });

  const closeModal = () =>
    setModalConfig((prev) => ({
      ...prev,
      show: false,
    }));

  const confirmDeleteAll = () => {
    openConfirmModal({
      title: "Eliminar todas las notificaciones",
      message: "¿Seguro que querés eliminar todas las notificaciones?",
      confirmText: "Eliminar todas",
      confirmColor: "danger",
      onConfirm: () => {
        notificationsService.deleteAll();
        closeModal();
      },
    });
  };

  const confirmDeleteOne = (id) => {
    openConfirmModal({
      title: "🗑️ Eliminar notificación",
      message: "¿Seguro que querés eliminar esta notificación?",
      confirmText: "Eliminar",
      confirmColor: "danger",
      onConfirm: () => {
        notificationsService.deleteNotification(id);
        closeModal();
      },
    });
  };

  const handleMarkAllAsRead = () => notificationsService.markAllAsRead();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🔔 Notificaciones</h2>

      <div className={styles.actions}>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleMarkAllAsRead}
          className={styles.btnSecondary}
        >
          ✅ Marcar todas como leídas
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={confirmDeleteAll}
          className={styles.btnDanger}
        >
          🗑️ Eliminar todas
        </motion.button>
      </div>

      <div className={styles.list}>
        {notifications.length === 0 ? (
          <motion.div
            className={styles.empty}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p>No tenés notificaciones pendientes</p>
            <span>
              Volvé más tarde o revisá tus <strong>reportes</strong> 👀
            </span>
          </motion.div>
        ) : (
          notifications.map((n) => (
            <NotificationCard
              key={n.id}
              notification={n}
              onDelete={() => confirmDeleteOne(n.id)}
            />
          ))
        )}
      </div>

  
      <ConfirmModal
        show={modalConfig.show}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        confirmColor={modalConfig.confirmColor}
        onConfirm={modalConfig.onConfirm}
        onClose={closeModal}
      />
    </div>
  );
}