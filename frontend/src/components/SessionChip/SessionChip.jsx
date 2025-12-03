import styles from "./SessionChip.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmModal from "../Modals/ConfirmModal/ConfirmModal";
import { PayModal } from "../Modals/PayModal/PayModal";
import { RescheduleModal } from "../Modals/RescheduleModal/RescheduleModal";

export default function SessionChip({
  session,
  onCancel,
  onMarkPaid,
  onReschedule,
  showActions,
}) {
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);
  const [openPay, setOpenPay] = useState(false);
  const [openReschedule, setOpenReschedule] = useState(false);
  const navigate = useNavigate();

 
  const handleConfirmCancel = () => {
    onCancel(session.id);
    setShowConfirmCancel(false);
  };


  const handleConfirmPay = (data) => {
    const fechaISO = new Date(data.fechaPago).toISOString();
    onMarkPaid(session.id, fechaISO, data.monto);
    setOpenPay(false);
  };


  const handleConfirmReschedule = (data) => {
    const nuevaFechaISO = new Date(data.nuevaFecha).toISOString();
    onReschedule(session, nuevaFechaISO);
    setOpenReschedule(false);
  };


  const handlePacienteClick = () => {
    const nombre = encodeURIComponent(session.patient?.name || "");
    const fecha = new Date(session.fecha);

    const fechaDesde = fecha.toISOString().slice(0, 10);

    const fechaHastaObj = new Date(fecha);
    fechaHastaObj.setDate(fecha.getDate() + 1);
    const fechaHasta = fechaHastaObj.toISOString().slice(0, 10);

    navigate(
      `/sesiones?paciente=${nombre}&fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`
    );
  };

  const time = new Date(session.fecha).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <div
        className={`${styles.chip} ${
          styles[session.estado?.toLowerCase() || "pendiente"]
        }`}
      >
        <div className={styles.left}>
          <div
            className={styles.name}
            onClick={handlePacienteClick}
            style={{ cursor: "pointer" }}
            title="Ver sesiones de este paciente"
          >
            {session.patient?.name || "—"}
          </div>

          <div className={styles.meta}>
            <span className={styles.time}>{time}</span>
          </div>
        </div>

        {showActions && (
          <div className={styles.actions}>
            <button
              className={styles.rescheduleBtn}
              title="Reprogramar sesión"
              onClick={() => setOpenReschedule(true)}
            >
              📅
            </button>

            <button
              className={styles.rescheduleBtn}
              title="Cancelar sesión"
              onClick={() => setShowConfirmCancel(true)}
            >
              🛑
            </button>
          </div>
        )}
      </div>

    
      <ConfirmModal
        show={showConfirmCancel}
        onClose={() => setShowConfirmCancel(false)}
        onConfirm={handleConfirmCancel}
        title="Cancelar sesión"
        message="¿Estás seguro de que querés cancelar esta sesión?"
        confirmText="Cancelar sesión"
        confirmColor="danger"
      />


      <PayModal
        open={openPay}
        onClose={() => setOpenPay(false)}
        onConfirm={handleConfirmPay}
        sesion={session}
      />


      <RescheduleModal
        open={openReschedule}
        onClose={() => setOpenReschedule(false)}
        onConfirm={handleConfirmReschedule}
        sesion={session}
      />
    </>
  );
}
