import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

export function PayModal({ open, onClose, onConfirm, sesion }) {
  const [fechaPago, setFechaPago] = useState("");
  const [monto, setMonto] = useState(sesion?.precio || "");

  const handleConfirm = () => {
    if (!fechaPago) {
      alert("Por favor ingresá una fecha de pago.");
      return;
    }
    onConfirm({ fechaPago, monto });
  };

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
          backgroundColor: "#fdfdfd",
        },
      }}
    >
      <DialogTitle
        style={{
          fontWeight: 600,
          fontSize: "1.3rem",
          textAlign: "center",
          paddingBottom: "4px",
          color: "#2e7d32",
        }}
      >
        Registrar pago
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
        <p style={{ fontSize: "0.95rem", color: "#333", marginBottom: "8px" }}>
          Vas a registrar el pago de la sesión con{" "}
          <strong>{sesion?.paciente?.nombre}</strong> el{" "}
          <strong>{new Date(sesion?.fecha).toLocaleString()}</strong>.
        </p>

        <TextField
          label="Fecha de pago"
          type="datetime-local"
          value={fechaPago}
          onChange={(e) => setFechaPago(e.target.value)}
          fullWidth
          margin="dense"
          InputLabelProps={{ shrink: true }}
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

      <DialogActions
        style={{
          padding: "12px 20px",
          justifyContent: "flex-end",
          gap: "8px",
        }}
      >
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="success"
          style={{
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Confirmar pago
        </Button>
      </DialogActions>
    </Dialog>
  );
}