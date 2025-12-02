import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

export function DeleteModal({ open, onClose, onConfirm, sesion }) {
  const [motivo, setMotivo] = useState("");
  const [pagada, setPagada] = useState(false);
  const [monto, setMonto] = useState("");

  const handleConfirm = () => {
    onConfirm({ motivo, pagada, monto: pagada ? parseFloat(monto) : null });
    setMotivo("");
    setPagada(false);
    setMonto("");
  };

  if (!sesion) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style: {
          borderRadius: "16px",
          padding: "8px 0",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          backgroundColor: "#fff",
        },
      }}
    >
      <DialogTitle
        style={{
          fontWeight: 600,
          fontSize: "1.3rem",
          textAlign: "center",
          color: "#c62828",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            display: "inline-block",
            animation: "pulse 1s infinite",
          }}
        >
          ⚠️
        </span>
        Eliminar sesión
      </DialogTitle>

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1); }
          }
        `}
      </style>

      <DialogContent
        dividers
        style={{
          padding: "16px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <p style={{ fontSize: "0.95rem", color: "#333" }}>
          Estás a punto de eliminar permanentemente la sesión de{" "}
          <strong>{sesion.paciente.nombre}</strong> con la fecha y horario:{" "}
          {new Date(sesion.fecha).toLocaleString()}.<br />
          Toda la información adjunta (recibos, notas, pagos) se perderá.
        </p>
      </DialogContent>

      <DialogActions
        style={{
          padding: "12px 20px",
          justifyContent: "flex-end",
          gap: "8px",
        }}
      >
        <Button onClick={onClose}>Cerrar</Button>
        <Button
          onClick={handleConfirm}
          color="error"
          variant="contained"
          style={{
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Confirmar eliminación
        </Button>
      </DialogActions>
    </Dialog>
  );
}
