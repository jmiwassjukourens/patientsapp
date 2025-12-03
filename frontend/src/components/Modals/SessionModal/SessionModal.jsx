import { useState, useEffect } from "react";
import styles from "./SessionModal.module.css";
import {
  backendISOToInputLocal,
  inputLocalToBackendLocalDateTime,
  inputLocalToDate,
} from "../../../utils/dateUtils.js";
import { fetchPatients } from "../../../services/PatientService.js"; 
import { useToast } from "../../../hooks/useToast.jsx";

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
    alert("Completá la fecha y seleccioná un paciente.");
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
    <div className={styles.backdrop} onClick={onCancel}>
      <div className={styles.modal} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>{sesion ? "✏️ Editar sesión" : "🗓️ Nueva sesión"}</h3>
            <button
              className={styles.closeBtn}
              onClick={onCancel}
              aria-label="Cerrar"
            >
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
                required
              />
            </label>

            <label>
              Precio
              <input
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                min="0"
              />
            </label>
          </div>

          <label>
            Paciente
            <select
              value={patientId ?? ""}
              onChange={(e) => {
                const val = e.target.value;
                setPatientId(val ? Number(val) : null);
                const selected = patients.find((p) => p.id === Number(val));
                setNombre(selected?.name ?? "");
              }}
              required
            >
              <option value="">Seleccioná un paciente...</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>

          <div className={styles.divider} />

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={recurrente}
              onChange={(e) => setRecurrente(e.target.checked)}
            />
            Crear periódicamente (se generarán sesiones semanales)
          </label>

          {recurrente && (
            <div className={styles.recurrenceBox}>
              <label>
                Día de la semana
                <select value={diaSemana} onChange={(e) => setDiaSemana(e.target.value)}>
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
            <button type="button" className={styles.cancel} onClick={onCancel}>
              Cancelar
            </button>

            <button type="submit" className={styles.save}>
              {sesion ? "Guardar cambios" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
