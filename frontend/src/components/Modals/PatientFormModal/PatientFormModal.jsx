import { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Stack,
} from "@mui/material";

export default function PatientFormModal({ open, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({
    name: "",
    dni: "",
    email: "",
    phone: "",
    debt: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form, debt: Number(form.debt) };
    if (!initialData) payload.id = Date.now();
    onSubmit(payload);
  };

  return (
    <Dialog open={!!open} onClose={onClose} aria-labelledby="patient-form-title">
      <DialogTitle id="patient-form-title">
        {initialData ? "Editar paciente" : "Dar alta paciente"}
      </DialogTitle>
      <DialogContent dividers>
        <form id="patient-form" onSubmit={handleSubmit}>
          <Stack spacing={1.25}>
            <TextField
              label="Nombre y apellido"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{ autoFocus: true }}
            />
            <TextField
              label="DNI"
              name="dni"
              value={form.dni}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Teléfono"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Deuda"
              name="debt"
              type="number"
              value={form.debt}
              onChange={handleChange}
              fullWidth
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button type="submit" form="patient-form" variant="contained">
          {initialData ? "Guardar cambios" : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
