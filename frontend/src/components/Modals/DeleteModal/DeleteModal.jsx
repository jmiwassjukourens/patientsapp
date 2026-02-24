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
    >
      <DialogTitle>
        Eliminar sesión
      </DialogTitle>

      <DialogContent
        dividers
      >
        <p style={{ fontSize: "0.95rem" }}>
          Estás a punto de eliminar permanentemente la sesión de{" "}
          <strong>{sesion.paciente.nombre}</strong> con la fecha y horario:{" "}
          {new Date(sesion.fecha).toLocaleString()}.<br />
          Toda la información adjunta (recibos, notas, pagos) se perderá.
        </p>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cerrar
        </Button>
        <Button
          onClick={handleConfirm}
          color="error"
          variant="contained"
        >
          Confirmar eliminación
        </Button>
      </DialogActions>
    </Dialog>
  );
}
