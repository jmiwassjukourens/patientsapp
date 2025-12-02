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

export function CancelModal({ open, onClose, onConfirm, sesion }) {
  const [motivo, setMotivo] = useState("");
  const [pagada, setPagada] = useState(false);
  const [monto, setMonto] = useState("");

  const handleConfirm = () => {
    onConfirm({ motivo, pagada, monto: pagada ? parseFloat(monto) : null });
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
        }}
      >
        Cancelar sesión
      </DialogTitle>

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
          Estás cancelando la sesión de{" "}
          <strong>{sesion?.patient?.name ?? "Paciente desconocido"}</strong> el{" "}
          {sesion?.fecha ? new Date(sesion.fecha).toLocaleString() : ""}.
        </p>


        <TextField
          fullWidth
          label="Motivo (opcional)"
          variant="outlined"
          margin="normal"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={pagada}
              onChange={(e) => setPagada(e.target.checked)}
              color="primary"
            />
          }
          label="La sesión quedó pagada"
        />

        {pagada && (
          <TextField
            fullWidth
            label="Monto pagado"
            type="number"
            variant="outlined"
            margin="normal"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
          />
        )}
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
          Confirmar cancelación
        </Button>
      </DialogActions>
    </Dialog>
  );
}