import { useState } from "react";
import styles from "./SessionForm.module.css";


function SessionForm({ initialData = {}, onSubmit, onCancel, title }) {
  const [formData, setFormData] = useState({
    paciente: initialData.paciente?.nombre || "",
    fecha: initialData.fecha || "",
    fechaDePago: initialData.fechaDePago || "",
    estado: initialData.estado || "Pendiente",
    precio: initialData.precio || "",
    adjunto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.field}>
        <label>Nombre del Paciente</label>
        <input
          type="text"
          name="paciente"
          value={formData.paciente}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.field}>
        <label>Fecha de Sesión</label>
        <input
          type="datetime-local"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.field}>
        <label>Fecha de Pago (opcional)</label>
        <input
          type="datetime-local"
          name="fechaDePago"
          value={formData.fechaDePago}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label>Estado</label>
        <select
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          required
        >
          <option value="Pendiente">Pendiente</option>
          <option value="Pagado">Pagado</option>
          <option value="Cancelada">Cancelada</option>
        </select>
      </div>

      <div className={styles.field}>
        <label>Precio ($)</label>
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          min="0"
          required
        />
      </div>

      <div className={styles.field}>
        <label>Adjunto (opcional)</label>
        <input type="file" name="adjunto" onChange={handleChange} />
      </div>

      <div className={styles.buttons}>
        <button type="submit" className={styles.submitBtn}>
          Guardar
        </button>
        {onCancel && (
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onCancel}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default SessionForm;
