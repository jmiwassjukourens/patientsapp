import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useToast } from "../../../hooks/useToast.jsx";
import { backendISOToInputLocal, inputLocalToBackendLocalDateTime } from "../../../utils/dateUtils.js";

export function PayModal({ open, onClose, onConfirm, sesion }) {

  const [fechaPago, setFechaPago] = useState(() => backendISOToInputLocal(sesion?.fechaDePago || ""));
  const [monto, setMonto] = useState(sesion?.precio ?? "");

  const toast = useToast();



  useEffect(() => {
    setFechaPago(backendISOToInputLocal(sesion?.fechaDePago || ""));
    setMonto(sesion?.precio ?? "");
  }, [sesion]);

  const handleConfirm = () => {
    if (!fechaPago) {
      toast.error("Por favor ingresá una fecha de pago.");
      return;
    }

    const backendFecha = inputLocalToBackendLocalDateTime(fechaPago);
    onConfirm({ fechaPago: backendFecha, monto });

  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        Registrar pago
      </DialogTitle>

      <DialogContent
        dividers
      >
        <p style={{ margin: 0 }}>
          Vas a registrar el pago de la sesión con{" "}
          <strong>{sesion?.patient?.name ?? sesion?.paciente?.nombre ?? "—"}</strong> el{" "}
          <strong>{sesion?.fecha ? new Date(sesion.fecha).toLocaleString() : "—"}</strong>.
        </p>

        <TextField
          label="Fecha de pago"
          type="datetime-local"
          value={fechaPago}
          onChange={(e) => setFechaPago(e.target.value)}
          fullWidth
          margin="dense"
          InputLabelProps={{ shrink: true }}
          inputProps={{ /* pone autoFocus en apertura para accesibilidad */ autoFocus: true }}
        />

        <TextField
          label="Monto pagado"
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          fullWidth
          margin="dense"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="success"
        >
          Confirmar pago
        </Button>
      </DialogActions>
    </Dialog>
  );
}