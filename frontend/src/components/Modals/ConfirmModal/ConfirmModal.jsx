import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";

export default function ConfirmModal({
  show,
  onClose,
  onConfirm,
  title = "⚠️ Confirmar acción",
  message = "¿Estás seguro de realizar esta acción?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmColor = "danger",
}) {
  const muiColor =
    confirmColor === "danger"
      ? "error"
      : confirmColor === "warning"
        ? "warning"
        : "primary";

  return (
    <Dialog open={!!show} onClose={onClose} aria-labelledby="confirm-dialog-title">
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          {cancelText}
        </Button>
        <Button onClick={onConfirm} variant="contained" color={muiColor}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
