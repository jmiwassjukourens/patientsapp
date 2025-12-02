import { useState } from "react";
import styles from "./SessionModal.module.css";
export default function SessionModal({ defaultDate, onClose, onSave }) {
  const defaultDateTime = defaultDate ? defaultDate + "T09:00" : "";

  const endOfYear = new Date(new Date().getFullYear(), 11, 31)
    .toISOString()
    .slice(0, 10);

  const [fecha, setFecha] = useState(defaultDateTime || "");
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [adjunto, setAdjunto] = useState("");
  const [recurrente, setRecurrente] = useState(false);
  const [diaSemana, setDiaSemana] = useState("1");
  const [fechaLimite, setFechaLimite] = useState(endOfYear);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fecha || !nombre) {
      alert("Completá fecha y nombre del paciente");
      return;
    }

    const basePayload = {
      fecha: new Date(fecha).toISOString(),
      fechaDePago: null,
      estado: "Pendiente",
      paciente: { nombre },
      precio: Number(precio) || 0,
      adjunto: adjunto || null,
    };

    if (!recurrente) {
      onSave(basePayload);
      return;
    }

    if (!fechaLimite) {
      alert("Seleccioná una fecha límite para la recurrencia");
      return;
    }

    const sesiones = generarSesionesRecurrentes(
      basePayload,
      Number(diaSemana),
      fechaLimite
    );

    onSave(sesiones);
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>🗓️ Nueva sesión</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            ✖
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <label>
              Fecha y hora
              <input
                type="datetime-local"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </label>

            <label>
              Precio
              <input
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
            </label>
          </div>

          <label>
            Nombre del paciente
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej. Ana López"
            />
          </label>
          <div className={styles.divider} />

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={recurrente}
              onChange={(e) => setRecurrente(e.target.checked)}
            />
            Crear periódicamente
          </label>

          {recurrente && (
            <div className={styles.recurrenceBox}>
              <label>
                Día de la semana
                <select
                  value={diaSemana}
                  onChange={(e) => setDiaSemana(e.target.value)}
                >
                  <option value="0">Domingo</option>
                  <option value="1">Lunes</option>
                  <option value="2">Martes</option>
                  <option value="3">Miércoles</option>
                  <option value="4">Jueves</option>
                  <option value="5">Viernes</option>
                  <option value="6">Sábado</option>
                </select>
              </label>

              <label>
                Fecha límite
                <input
                  type="date"
                  value={fechaLimite}
                  onChange={(e) => setFechaLimite(e.target.value)}
                />
              </label>
            </div>
          )}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancel}
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.save}>
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 🧠 Generador de sesiones recurrentes
function generarSesionesRecurrentes(basePayload, diaSemana, fechaLimite) {
  const sesiones = [];
  let fechaActual = new Date(basePayload.fecha);
  const limite = new Date(fechaLimite);

  while (fechaActual.getDay() !== diaSemana) {
    fechaActual.setDate(fechaActual.getDate() + 1);
  }

  while (fechaActual <= limite) {
    const nuevaSesion = {
      ...basePayload,
      fecha: new Date(fechaActual).toISOString(),
    };
    sesiones.push(nuevaSesion);
    fechaActual.setDate(fechaActual.getDate() + 7);
  }

  return sesiones;
}