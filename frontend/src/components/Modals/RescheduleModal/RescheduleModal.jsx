import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
} from "@mui/material";

export function RescheduleModal({ open, onClose, onConfirm, sesion }) {
  const [nuevaFecha, setNuevaFecha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nuevaFecha) return;
    onConfirm({ nuevaFecha });
  };

  return (
    <Dialog open={!!open} onClose={onClose} aria-labelledby="reschedule-dialog-title">
      <DialogTitle id="reschedule-dialog-title">Reprogramar sesión</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          Elegí una nueva fecha y hora para <b>{sesion?.paciente?.nombre ?? "—"}</b>.
        </Typography>

        <form id="reschedule-form" onSubmit={handleSubmit}>
          <TextField
            label="Nueva fecha y hora"
            type="datetime-local"
            value={nuevaFecha}
            onChange={(e) => setNuevaFecha(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
            inputProps={{ autoFocus: true }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button type="submit" form="reschedule-form" variant="contained">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}