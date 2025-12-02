import { useState, useEffect } from "react";
import styles from "./PatientFormModal.module.css";

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

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>{initialData ? "Editar paciente" : "Dar alta paciente"}</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Nombre y apellido"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="dni"
            placeholder="DNI"
            value={form.dni}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Teléfono"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="debt"
            placeholder="Deuda"
            value={form.debt}
            onChange={handleChange}
          />

          <div className={styles.buttons}>
            <button type="submit" className={styles.saveBtn}>
              {initialData ? "Guardar cambios" : "Guardar"}
            </button>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
