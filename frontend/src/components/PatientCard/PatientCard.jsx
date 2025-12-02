import {
  FaBell,
  FaClock,
  FaHistory,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import styles from "./PatientCard.module.css";

export default function PatientCard({
  patient,
  onDelete,
  onEdit,
  onNotify,
  onViewPending,
  onViewHistory,
}) {
    const handleNotify = () => {
      onNotify(patient.id);
    };


  const hasDebt = patient.debt > 0;

  return (
    <div
      className={`${styles.card} ${hasDebt ? styles.debt : ""}`}
      title={hasDebt ? "Paciente con deuda" : ""}
    >
      <div className={styles.info}>
        <h3 className={styles.name}>{patient.name}</h3>
        <p>DNI: {patient.dni}</p>
        <p>Email: {patient.email}</p>
        <p>Tel: {patient.phone}</p>
        {hasDebt && <p className={styles.debtText}>Deuda: ${patient.debt}</p>}
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.actionBtn} ${styles.notifyBtn}`}
          onClick={handleNotify}
        >
          <FaBell />
          <span>Notificar</span>
        </button>

        <button
          className={`${styles.actionBtn} ${styles.pendingBtn}`}
          onClick={onViewPending}
        >
          <FaClock />
          <span>Pendientes</span>
        </button>

        <button
          className={`${styles.actionBtn} ${styles.historyBtn}`}
          onClick={onViewHistory}
        >
          <FaHistory />
          <span>Historial</span>
        </button>

        <button
          className={`${styles.actionBtn} ${styles.editBtn}`}
          onClick={() => onEdit(patient)}
        >
          <FaEdit />
          <span>Editar</span>
        </button>

        <button
          className={`${styles.actionBtn} ${styles.deleteBtn}`}
          onClick={onDelete}
        >
          <FaTrash />
          <span>Eliminar</span>
        </button>
      </div>
    </div>
  );
}