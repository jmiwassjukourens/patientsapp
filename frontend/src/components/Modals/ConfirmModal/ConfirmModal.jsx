import { motion, AnimatePresence } from "framer-motion";
import styles from "./ConfirmModal.module.css";

export default function ConfirmModal({
  show,
  onClose,
  onConfirm,
  title = "⚠️ Confirmar acción",
  message = "¿Estás seguro de realizar esta acción?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmColor = "danger", 
}) {
  const confirmBtnClass =
    confirmColor === "danger"
      ? styles.btnDelete
      : confirmColor === "warning"
      ? styles.btnWarn
      : styles.btnConfirm;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.message}>{message}</p>
            <div className={styles.buttons}>
              <button onClick={onClose} className={styles.btnCancel}>
                {cancelText}
              </button>
              <button onClick={onConfirm} className={confirmBtnClass}>
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
