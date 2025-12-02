import { useState } from "react";
import styles from "./RescheduleModal.module.css";

export function RescheduleModal({ open, onClose, onConfirm, sesion }) {
  const [nuevaFecha, setNuevaFecha] = useState("");

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nuevaFecha) return;
    onConfirm({ nuevaFecha });
  };

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    animation: "fadeIn 0.3s ease-in-out",
  };

  const modalStyle = {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "24px",
    width: "350px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    transform: "scale(1)",
    transition: "transform 0.2s ease",
  };

  const titleStyle = {
    marginBottom: "10px",
    fontSize: "1.4rem",
    color: "#333",
    fontWeight: "600",
  };

  const textStyle = {
    color: "#555",
    fontSize: "0.95rem",
    marginBottom: "18px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "20px",
    fontSize: "0.95rem",
  };

  const actionsStyle = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  };

  const buttonBase = {
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "0.9rem",
    transition: "all 0.2s ease",
  };

  const cancelBtnStyle = {
    ...buttonBase,
    backgroundColor: "#f0f0f0",
    color: "#333",
  };

  const confirmBtnStyle = {
    ...buttonBase,
    backgroundColor: "#4CAF50",
    color: "white",
  };

  const handleHover = (e, hoverStyle, normalStyle) => {
    Object.assign(e.target.style, hoverStyle);
    setTimeout(() => Object.assign(e.target.style, normalStyle), 200);
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3 style={titleStyle}>📅 Reprogramar sesión</h3>
        <p style={textStyle}>
          Elegí una nueva fecha y hora para <b>{sesion.paciente?.nombre}</b>
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="datetime-local"
            value={nuevaFecha}
            onChange={(e) => setNuevaFecha(e.target.value)}
            style={inputStyle}
            required
          />

          <div style={actionsStyle}>
            <button
              type="button"
              style={cancelBtnStyle}
              onClick={onClose}
              onMouseEnter={(e) =>
                handleHover(e, { backgroundColor: "#e0e0e0" }, cancelBtnStyle)
              }
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={confirmBtnStyle}
              onMouseEnter={(e) =>
                handleHover(e, { backgroundColor: "#45a049" }, confirmBtnStyle)
              }
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}