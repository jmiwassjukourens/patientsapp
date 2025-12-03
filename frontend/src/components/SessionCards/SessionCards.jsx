import styles from "./SessionCards.module.css";
import { DeleteModal } from "../Modals/DeleteModal/DeleteModal";
import { PayModal } from "../Modals/PayModal/PayModal";
import { useState } from "react";
import ConfirmModal from "../Modals/ConfirmModal/ConfirmModal";

function SessionCards({ sesiones, onEdit, onDelete, onMarkAsPaid }) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openPay, setOpenPay] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);


  const handleOpenDelete = (sesion) => {
    setSelectedSession(sesion);
    setOpenDelete(true);
  };


  const handleConfirmDelete = (data) => {
    onDelete(selectedSession.id, data);
    setOpenDelete(false);
    setSelectedSession(null);
  };


  const handleOpenPay = (sesion) => {
    setSelectedSession(sesion);
    setOpenPay(true);
  };


const handleConfirmPay = (data) => {
  onMarkAsPaid(selectedSession.id, data.fechaPago);
  setOpenPay(false);
  setSelectedSession(null);
};

  return (
    <div className={styles.cardsContainer}>
  {sesiones.length === 0 ? (
    <p className={styles.noResults}>No hay sesiones que coincidan.</p>
  ) : (
    <div className={styles.grid}>
      {sesiones.map((s) => (
        <div key={s.id} className={`${styles.card} ${styles[`estado_${s.estado.toLowerCase()}`]}`}>
          <div className={styles.cardHeader}>
            <h3 className={styles.paciente}>{s.patient.name}</h3>
            <span className={`${styles.badge} ${styles[s.estado.toLowerCase()]}`}>
              {s.estado}
            </span>
          </div>

          <div className={styles.cardBody}>
            <p>
              <span className={styles.label}>Fecha sesión:</span>{" "}
              {new Date(s.fecha).toLocaleString()}
            </p>
            <p>
              <span className={styles.label}>Fecha de pago:</span>{" "}
              {s.fechaDePago ? new Date(s.fechaDePago).toLocaleString() : "—"}
            </p>
            <p>
              <span className={styles.label}>Precio:</span> ${s.precio}
            </p>
          </div>

          <div className={styles.cardActions}>

            <button
              className={`${styles.btnPaid} ${s.fechaDePago ? styles.disabled : ""}`}
              disabled={!!s.fechaDePago}
              onClick={(e) => { e.currentTarget.blur(); handleOpenPay(s); }}
            >
              💰
            </button>

            <button className={styles.btnEdit} onClick={() => onEdit(s)}>✏️</button>
            <button className={styles.btnDelete} onClick={() => handleOpenDelete(s)}>🗑️</button>
          </div>
        </div>
      ))}
    </div>
  )}

    <ConfirmModal
      show={openDelete}
      onClose={() => setOpenDelete(false)}
      onConfirm={handleConfirmDelete}
      title="⚠️ Eliminar sesión"
      message={
        selectedSession
          ? `Estás a punto de eliminar permanentemente la sesión de ${selectedSession.patient.name} 
            con fecha y horario: ${new Date(selectedSession.fecha).toLocaleString()}.
            Toda la información adjunta (recibos, notas, pagos) se perderá.`
          : ""
      }
      confirmText="Confirmar eliminación"
      cancelText="Cerrar"
      confirmColor="danger"
    />


      <PayModal
        open={openPay}
        onClose={() => setOpenPay(false)}
        onConfirm={handleConfirmPay}
        sesion={selectedSession}
      />
    </div>
  );
}

export default SessionCards;
