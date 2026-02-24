import { useEffect } from "react";
import SessionForm from "../../SessionForm/SessionForm";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";

function EditSesionModal({ sesion, onUpdate, onCancel }) {
  useEffect(() => {}, []);

const handleSubmit = (data) => {
  const sesionEditada = {
    ...sesion,
    fecha: data.fecha,
    fechaDePago: data.fechaDePago || null,
    estado: data.estado,
    precio: Number(data.precio)
  };

  onUpdate(sesion.id, sesionEditada); 
};

  return (
    <Dialog open={!!sesion} onClose={onCancel} aria-labelledby="edit-session-title">
      <DialogTitle id="edit-session-title" sx={{ pr: 6 }}>
        Editar sesión
        <IconButton
          aria-label="Cerrar"
          onClick={onCancel}
          sx={{ position: "absolute", right: 10, top: 10 }}
        >
          <span aria-hidden="true">✕</span>
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <SessionForm
          title="Editar Sesión"
          initialData={sesion}
          onSubmit={handleSubmit}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

export default EditSesionModal;
