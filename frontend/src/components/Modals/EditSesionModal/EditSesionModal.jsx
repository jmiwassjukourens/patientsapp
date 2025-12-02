import { useEffect } from "react";
import SessionForm from "../../SessionForm/SessionForm";
import styles from "./EditSesionModal.module.css";

function EditSesionModal({ sesion, onUpdate, onCancel }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

const handleSubmit = (data) => {
  const sesionEditada = {
    ...sesion,
    fecha: data.fecha,
    fechaDePago: data.fechaDePago || null,
    estado: data.estado,
    paciente: { nombre: data.paciente },
    precio: Number(data.precio),
    adjunto: data.adjunto ? data.adjunto.name : sesion.adjunto,
  };

  onUpdate(sesion.id, sesionEditada); 
};

  return (
    <div className={styles.backdrop} onClick={onCancel}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} 
      >
        <button className={styles.closeBtn} onClick={onCancel}>
          ✖
        </button>
        <SessionForm
          title="Editar Sesión"
          initialData={sesion}
          onSubmit={handleSubmit}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}

export default EditSesionModal;
