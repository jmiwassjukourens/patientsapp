import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./SesionesPage.module.css";
import SessionCards from "../../components/SessionCards/SessionCards";
import NewSessionButton from "../../components/NewSessionButton/NewSessionButton";
import FiltersBar from "../../components/FiltersBar/FiltersBar";
import EditSesionModal from "../../components/Modals/EditSesionModal/EditSesionModal"; 
import SessionModal from "../../components/Modals/SessionModal/SessionModal"; 
import { getSessions, updateSession, deleteSession, markAsPaid ,addSessionForPatient,addPeriodicSessionsForPatient} from "../../services/sessionService";
import { useToast } from "../../hooks/useToast.jsx";
 
function SesionesPage() {
  const [sesiones, setSesiones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");
  const [selectedSesion, setSelectedSesion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const toast = useToast();

  const [filtros, setFiltros] = useState({
    estado: "",
    busqueda: "",
    fechaDesde: "",
    fechaHasta: "",
    fechaPagoDesde: "",
    fechaPagoHasta: ""
  });

  const [searchParams] = useSearchParams();

  const pacienteParam = searchParams.get("paciente");
  const fechaParam = searchParams.get("fecha");
  const estadoParam = searchParams.get("estado");
  const fechaDesdeParam = searchParams.get("fechaDesde");
  const fechaHastaParam = searchParams.get("fechaHasta");


  useEffect(() => {
    async function fetchData() {
      const data = await getSessions();
      setSesiones(data);
      setLoading(false);
    }
    fetchData();
  }, []);


  useEffect(() => {
    if (pacienteParam || fechaParam || fechaDesdeParam || fechaHastaParam || estadoParam) {
      let fechaDesde = "";
      let fechaHasta = "";

      if (fechaDesdeParam && fechaHastaParam) {
        fechaDesde = fechaDesdeParam;
        fechaHasta = fechaHastaParam;
      } else if (fechaParam) {
        const fecha = new Date(fechaParam);
        const year = fecha.getFullYear();
        const month = fecha.getMonth();
        const lastDay = new Date(year, month + 1, 0).getDate();

        fechaDesde = `${year}-${String(month + 1).padStart(2, "0")}-01`;
        fechaHasta = `${year}-${String(month + 1).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
      }

      setFiltros((prev) => ({
        ...prev,
        estado: estadoParam || "",
        busqueda: pacienteParam || "",
        fechaDesde,
        fechaHasta
      }));
    }
  }, [pacienteParam, fechaParam, fechaDesdeParam, fechaHastaParam, estadoParam]);



  const handleFilterChange = (f) => setFiltros(f);

  const handleDelete = async (id) => {
    await deleteSession(id);
    setSesiones((prev) => prev.filter((s) => s.id !== id));
  };

const handleMarkAsPaid = async (id, fechaDePago = null) => {
  try {
    const actualizada = await markAsPaid(id, fechaDePago);
    setSesiones((prev) => prev.map((s) => (s.id === id ? actualizada : s)));
    toast.info("Sesión actualizada correctamente");
  } catch (err) {
    toast.error("Error marcando como pagado");

  }
};

  const handleUpdate = async (id, updatedData) => {
    const actualizada = await updateSession(id, updatedData);

    setSesiones((prev) =>
      prev.map((s) => (s.id === id ? actualizada : s))
    );

    setView("list");
  };


  const handleCreateSingle = async (payload) => {
    const pid = payload.patientId;
    await addSessionForPatient(pid, payload);

    const data = await getSessions();
    setSesiones(data);

    setShowModal(false);   
  };


  const handleCreatePeriodic = async ({ basePayload, periodic, sesiones }) => {
    const pid = basePayload.patientId;

    await addPeriodicSessionsForPatient(pid, { basePayload, periodic, sesiones });

    const data = await getSessions();
    setSesiones(data);

    setShowModal(false);   
  };


  const sesionesFiltradas = sesiones.filter((s) => {
    const fechaSesion = new Date(s.fecha);
    const fechaDesdeObj = filtros.fechaDesde ? new Date(filtros.fechaDesde) : null;
    const fechaHastaObj = filtros.fechaHasta ? new Date(filtros.fechaHasta) : null;

    const matchEstado = !filtros.estado || s.estado === filtros.estado;
    const matchBusqueda = !filtros.busqueda || s.patient.name.toLowerCase().includes(filtros.busqueda.toLowerCase());
    const matchFechaSesion =
      (!fechaDesdeObj || fechaSesion >= fechaDesdeObj) &&
      (!fechaHastaObj || fechaSesion <= fechaHastaObj);

    const fechaPago = s.fechaDePago ? new Date(s.fechaDePago) : null;
    const fechaPagoDesdeObj = filtros.fechaPagoDesde ? new Date(filtros.fechaPagoDesde) : null;
    const fechaPagoHastaObj = filtros.fechaPagoHasta ? new Date(filtros.fechaPagoHasta) : null;

    const matchFechaPago =
      (!fechaPagoDesdeObj || (fechaPago && fechaPago >= fechaPagoDesdeObj)) &&
      (!fechaPagoHastaObj || (fechaPago && fechaPago <= fechaPagoHastaObj));

    return matchEstado && matchBusqueda && matchFechaSesion && matchFechaPago;
  });


  if (loading) return <p>Cargando sesiones...</p>;

  if (view === "edit" && selectedSesion)
    return (
      <EditSesionModal
        sesion={selectedSesion}
        onUpdate={handleUpdate}
        onCancel={() => setView("list")}
      />
    );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Gestión de Sesiones</h2>
        <NewSessionButton onClick={() => setShowModal(true)} />
      </div>

      <div className={styles.filtersWrapper}>
        <FiltersBar
          onFilterChange={handleFilterChange}
          defaultBusqueda={pacienteParam || ""}
          defaultEstado={estadoParam || ""}
          defaultFechaDesde={
            fechaDesdeParam
              ? fechaDesdeParam
              : fechaParam
                ? new Date(fechaParam).toISOString().slice(0, 10)
                : ""
          }
          defaultFechaHasta={
            fechaHastaParam
              ? fechaHastaParam
              : fechaParam
                ? new Date(fechaParam).toISOString().slice(0, 10)
                : ""
          }
        />
      </div>

      <SessionCards
        sesiones={sesionesFiltradas}
        onEdit={(s) => {
          setSelectedSesion(s);
          setView("edit");
        }}
        onDelete={handleDelete}
        onMarkAsPaid={handleMarkAsPaid}
      />

      {showModal && (
        <SessionModal
          onCancel={() => setShowModal(false)}
          onSaveSingle={handleCreateSingle}
          onSavePeriodic={handleCreatePeriodic}
        />
      )}
    </div>
  );
}

export default SesionesPage;