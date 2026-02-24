import { useState, useEffect } from "react";
import {
  backendISOToInputLocal,
  inputLocalToBackendLocalDateTime,
} from "../../../utils/dateUtils.js";
import { fetchPatients } from "../../../services/PatientService.js"; 
import { useToast } from "../../../hooks/useToast.jsx";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

export default function SessionModal({
  sesion = null,
  onSaveSingle,
  onSavePeriodic,
  onCancel,
}) {

  const [patients, setPatients] = useState([]);

  const toast = useToast();

  const [fecha, setFecha] = useState(() =>
    backendISOToInputLocal(sesion?.fecha || "")
  );

  
  const [fechaDePago, setFechaDePago] = useState(() =>
    backendISOToInputLocal(sesion?.fechaDePago || "")
  );
  const [precio, setPrecio] = useState(sesion?.precio ?? "");
  const [estado, setEstado] = useState(sesion?.estado ?? "PENDIENTE");


  const [patientId, setPatientId] = useState(
    sesion?.patient?.id ?? sesion?.patientId ?? null
  );

  const [nombre, setNombre] = useState(
    sesion?.patient?.name ?? sesion?.paciente?.nombre ?? ""
  );

  const [adjunto, setAdjunto] = useState(sesion?.adjunto ?? null);

  const [recurrente, setRecurrente] = useState(!!sesion?.periodic);
  const [diaSemana, setDiaSemana] = useState(
    sesion?.periodic?.dayOfWeek ? dayOfWeekToNumber(sesion.periodic.dayOfWeek) : "1"
  );
  const [fechaLimite, setFechaLimite] = useState(sesion?.periodic?.endDate ?? "");


  useEffect(() => {
    setFecha(backendISOToInputLocal(sesion?.fecha || ""));
    setFechaDePago(backendISOToInputLocal(sesion?.fechaDePago || ""));
    setPrecio(sesion?.precio ?? "");
    setEstado(sesion?.estado ?? "PENDIENTE");
    setNombre(sesion?.patient?.name ?? sesion?.paciente?.nombre ?? "");
    setPatientId(sesion?.patient?.id ?? sesion?.patientId ?? null);
    setAdjunto(sesion?.adjunto ?? null);
    setRecurrente(!!sesion?.periodic);
    setDiaSemana(
      sesion?.periodic?.dayOfWeek ? dayOfWeekToNumber(sesion.periodic.dayOfWeek) : "1"
    );
    setFechaLimite(sesion?.periodic?.endDate ?? "");
  }, [sesion]);


  useEffect(() => {
    async function loadPatients() {
      try {
        const data = await fetchPatients();
        setPatients(Array.isArray(data) ? data : []);
      } catch (err) {
        toast.error("Error al cargar pacientes: " + err.message);
        setPatients([]);
      }
    }
    loadPatients();
  }, []);

  function dayOfWeekToNumber(day) {
    if (!day) return "1";
    const map = {
      SUNDAY: "0",
      MONDAY: "1",
      TUESDAY: "2",
      WEDNESDAY: "3",
      THURSDAY: "4",
      FRIDAY: "5",
      SATURDAY: "6",
    };
    return map[day.toUpperCase()] ?? "1";
  }

  function numberToDayOfWeek(num) {
    const map = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    return map[Number(num) % 7];
  }

  function generarSesionesRecurrentes(basePayload, diaSemanaNum, fechaLimiteStr) {
    const sesiones = [];


    const baseDate = new Date(basePayload.fecha.replace(" ", "T"));
    const limite = new Date(fechaLimiteStr);

    let fechaActual = new Date(baseDate);

    while (fechaActual.getDay() !== Number(diaSemanaNum)) {
      fechaActual.setDate(fechaActual.getDate() + 1);
    }

    while (fechaActual <= limite) {
      const yyyy = fechaActual.getFullYear();
      const mm = String(fechaActual.getMonth() + 1).padStart(2, "0");
      const dd = String(fechaActual.getDate()).padStart(2, "0");
      const hh = String(baseDate.getHours()).padStart(2, "0");
      const min = String(baseDate.getMinutes()).padStart(2, "0");

      const fechaStr = `${yyyy}-${mm}-${dd}T${hh}:${min}:00`;

      sesiones.push({
        ...basePayload,
        fecha: fechaStr,
      });

      fechaActual.setDate(fechaActual.getDate() + 7);
    }

    return sesiones;
  }

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!fecha || !patientId) {
    toast.error("Completá la fecha y seleccioná un paciente.");
    return;
  }

  const payloadBase = {
    fecha: inputLocalToBackendLocalDateTime(fecha), 
    fechaDePago: fechaDePago ? inputLocalToBackendLocalDateTime(fechaDePago) : null,
    estado: estado ?? "PENDIENTE",
    precio: Number(precio) || 0,
    patientId: Number(patientId),
  };

  try {
    if (!recurrente) {
      if (!onSaveSingle) throw new Error("onSaveSingle no definido");
      await onSaveSingle(payloadBase);
      toast.info("Sesión guardada correctamente");
    } else {
      if (!fechaLimite) {
        toast.error("Seleccioná una fecha límite para la recurrencia");
        return;
      }
      if (!onSavePeriodic) throw new Error("onSavePeriodic no definido");

      const basePayloadForGen = {
        ...payloadBase,
        fecha: inputLocalToBackendLocalDateTime(fecha).replace(" ", "T"),
      };

      const sesiones = generarSesionesRecurrentes(basePayloadForGen, diaSemana, fechaLimite);

      await onSavePeriodic({
        periodic: {
          frequency: "WEEKLY",
          every: 1,
          dayOfWeek: numberToDayOfWeek(diaSemana),
          endDate: fechaLimite,
        },
        basePayload: payloadBase,
        sesiones,
      });
      toast.info("Sesiones recurrentes guardadas correctamente ");
    }

    if (onCancel) onCancel();
  } catch (err) {
    toast.error("Error al guardar la sesión: " + err.message);
  }
};


  return (
    <Dialog open={true} onClose={onCancel} aria-labelledby="session-dialog-title">
      <DialogTitle id="session-dialog-title" sx={{ pr: 6 }}>
        {sesion ? "Editar sesión" : "Nueva sesión"}
        <Button
          onClick={onCancel}
          color="inherit"
          sx={{ position: "absolute", right: 10, top: 10, minWidth: 0, px: 1 }}
          aria-label="Cerrar"
        >
          ✕
        </Button>
      </DialogTitle>

      <DialogContent dividers>
        <form id="session-form" onSubmit={handleSubmit}>
          <Stack spacing={1.25}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
              <TextField
                label="Fecha y hora"
                type="datetime-local"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                inputProps={{ autoFocus: true }}
              />
              <TextField
                label="Precio"
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                fullWidth
                inputProps={{ min: 0 }}
              />
            </Stack>

            <FormControl fullWidth required size="small">
              <InputLabel id="patient-select-label">Paciente</InputLabel>
              <Select
                labelId="patient-select-label"
                label="Paciente"
                value={patientId ?? ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setPatientId(val ? Number(val) : null);
                  const selected = patients.find((p) => p.id === Number(val));
                  setNombre(selected?.name ?? "");
                }}
              >
                <MenuItem value="">
                  <em>Seleccioná un paciente…</em>
                </MenuItem>
                {patients.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Divider />

            <FormControlLabel
              control={
                <Checkbox
                  checked={recurrente}
                  onChange={(e) => setRecurrente(e.target.checked)}
                />
              }
              label={
                <Typography variant="body2">
                  Crear periódicamente (se generarán sesiones semanales)
                </Typography>
              }
            />

            {recurrente && (
              <Paper sx={{ p: 1.25 }}>
                <Stack spacing={1.25}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="dow-label">Día de la semana</InputLabel>
                      <Select
                        labelId="dow-label"
                        label="Día de la semana"
                        value={diaSemana}
                        onChange={(e) => setDiaSemana(e.target.value)}
                      >
                        <MenuItem value="0">Domingo</MenuItem>
                        <MenuItem value="1">Lunes</MenuItem>
                        <MenuItem value="2">Martes</MenuItem>
                        <MenuItem value="3">Miércoles</MenuItem>
                        <MenuItem value="4">Jueves</MenuItem>
                        <MenuItem value="5">Viernes</MenuItem>
                        <MenuItem value="6">Sábado</MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                      label="Fecha límite"
                      type="date"
                      value={fechaLimite}
                      onChange={(e) => setFechaLimite(e.target.value)}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Stack>
                </Stack>
              </Paper>
            )}
          </Stack>
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel} color="inherit">
          Cancelar
        </Button>
        <Button type="submit" form="session-form" variant="contained">
          {sesion ? "Guardar cambios" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
