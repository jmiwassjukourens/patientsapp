import { useEffect, useMemo, useState } from "react";
import { getSessions, addSession, deleteSession, updateSession } from "../../services/sessionService";
import CalendarGrid from "../../components/CalendarGrid/CalendarGrid";
import AgendaFilterBar from "../../components/CalendarGrid/AgendaFiltersBar";
import SessionModal from "../../components/Modals/SessionModal/SessionModal";
import styles from "./AgendaPage.module.css";

function toIso(d) {
  return d.toISOString().slice(0, 10);
}

export default function AgendaPage() {
  const today = new Date();
  const [sessions, setSessions] = useState([]);
  // displayedMonth is a Date representing any day in the shown month
  const [displayedMonth, setDisplayedMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState(null);
  const [showActions, setShowActions] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const s = await getSessions();
    setSessions(s);
  };

  const handleAdd = async (payload) => {
    if (Array.isArray(payload)) {
      const nuevas = [];
      for (const sesion of payload) {
        const newS = await addSession(sesion);
        nuevas.push(newS);
      }
      setSessions((prev) => [...prev, ...nuevas]);
    } else {
      const newS = await addSession(payload);
      setSessions((prev) => [...prev, newS]);
    }
    setModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar sesión?")) return;
    await deleteSession(id);
    setSessions((prev) => prev.filter((p) => p.id !== id));
  };

  const handleMarkPaid = async (id, fechaPago) => {
    await updateSession(id, { fechaDePago: fechaPago, estado: "Pagado" });
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, fechaDePago, estado: "Pagado" } : s))
    );
  };

  // month start and end (for filtering sessions to the shown month)
  const monthStart = useMemo(() => {
    const m = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth(), 1);
    m.setHours(0,0,0,0);
    return m;
  }, [displayedMonth]);

  const monthEnd = useMemo(() => {
    const m = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + 1, 0);
    m.setHours(23,59,59,999);
    return m;
  }, [displayedMonth]);

  // filter sessions to only those in the visible month 
  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      const fecha = new Date(s.fecha);
      return fecha >= monthStart && fecha <= monthEnd;
    });
  }, [sessions, monthStart, monthEnd]);

  const goMonth = (offset) => {
    setDisplayedMonth((prev) => {
      const y = prev.getFullYear();
      const m = prev.getMonth() + offset;
      return new Date(y, m, 1);
    });
  };

  const setToCurrentMonth = () => {
    const now = new Date();
    setDisplayedMonth(new Date(now.getFullYear(), now.getMonth(), 1));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>Agenda</h2>
                    <p className={styles.subtitle}>
            De la búsqueda a la gestión, en segundos
          </p>
          <div className={styles.headerControls}>
            <button
              className={styles.toggleActionsBtn}
              onClick={() => setShowActions((prev) => !prev)}
            >
              {showActions ? "Ocultar acciones" : "Mostrar acciones"}
            </button>
          </div>
        </div>

        <div className={styles.controls}>
           <div className={styles.currentMonthLabel}>
              {displayedMonth.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
            </div>
        </div>
      </div>

      <AgendaFilterBar
        displayedMonth={displayedMonth}
        onShortcutRangeChange={(desdeIso, hastaIso) => {
          const d = new Date(desdeIso + "T00:00:00");
          setDisplayedMonth(new Date(d.getFullYear(), d.getMonth(), 1));
        }}
      />


      <CalendarGrid
        displayedMonth={displayedMonth}
        sessions={filteredSessions}
        onCreateForDate={(isoDate) => {
          setModalDate(isoDate);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
        onMarkPaid={handleMarkPaid}
        showActions={showActions}
      />

      {modalOpen && (
        <SessionModal
          defaultDate={modalDate}
          onClose={() => setModalOpen(false)}
          onSave={handleAdd}
        />
      )}
    </div>
  );
}