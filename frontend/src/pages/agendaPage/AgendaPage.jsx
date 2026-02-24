import { useEffect, useMemo, useState } from "react";
import {
  getSessions,
  addSessionForPatient,
  addPeriodicSessionsForPatient,
  deleteSession,
  updateSession,
} from "../../services/sessionService";
import CalendarGrid from "../../components/CalendarGrid/CalendarGrid";
import AgendaFilterBar from "../../components/CalendarGrid/AgendaFiltersBar";
import SessionModal from "../../components/Modals/SessionModal/SessionModal";
import styles from "./AgendaPage.module.css";
import AppShell from "../../components/layout/AppShell/AppShell";
import { Button } from "@mui/material";

export default function AgendaPage() {
  const today = new Date();
  const [sessions, setSessions] = useState([]);
  const [displayedMonth, setDisplayedMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState(null);
  const [showActions, setShowActions] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const s = await getSessions();
    setSessions(s);
  };

  const handleCreateSingle = async (payload) => {
    const pid = payload.patientId;
    await addSessionForPatient(pid, payload);

    const data = await getSessions();
    setSessions(data);

    setShowModal(false);   
  };


  const handleCreatePeriodic = async ({ basePayload, periodic, sesiones }) => {
    const pid = basePayload.patientId;

    await addPeriodicSessionsForPatient(pid, { basePayload, periodic, sesiones });

    const data = await getSessions();
    setSessions(data);

    setShowModal(false);   
  };


  const handleDelete = async (id) => {
    await deleteSession(id);
    setSessions((prev) => prev.filter((p) => p.id !== id));
  };

  const handleMarkPaid = async (id, fechaPago) => {
    await updateSession(id, { fechaDePago: fechaPago, estado: "Pagado" });

    setSessions((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, fechaDePago, estado: "Pagado" } : s
      )
    );
  };

const handleReschedule = async (session, nuevaFecha) => {
  const updated = {
    ...session,
    fecha: nuevaFecha
  };

  const saved = await updateSession(session.id, updated);

  setSessions((prev) =>
    prev.map((s) =>
      s.id === session.id ? saved : s
    )
  );
};



  const monthStart = useMemo(() => {
    const m = new Date(
      displayedMonth.getFullYear(),
      displayedMonth.getMonth(),
      1
    );
    m.setHours(0, 0, 0, 0);
    return m;
  }, [displayedMonth]);

  const monthEnd = useMemo(() => {
    const m = new Date(
      displayedMonth.getFullYear(),
      displayedMonth.getMonth() + 1,
      0
    );
    m.setHours(23, 59, 59, 999);
    return m;
  }, [displayedMonth]);

  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      const fecha = new Date(s.fecha);
      return fecha >= monthStart && fecha <= monthEnd;
    });
  }, [sessions, monthStart, monthEnd]);

  return (
    <AppShell
      title="Agenda"
      subtitle="Planificación con lectura rápida y acciones contextuales"
      actions={
        <>
          <div className={styles.currentMonthLabel}>
            {displayedMonth.toLocaleDateString("es-ES", {
              month: "long",
              year: "numeric",
            })}
          </div>
          <Button
            variant="outlined"
            onClick={() => setShowActions((prev) => !prev)}
          >
            {showActions ? "Ocultar acciones" : "Mostrar acciones"}
          </Button>
        </>
      }
    >

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
        onReschedule={handleReschedule}   
        showActions={showActions}
      />


    {modalOpen && (
      <SessionModal
        date={modalDate}  
        onCancel={() => setModalOpen(false)}
        onSaveSingle={handleCreateSingle}
        onSavePeriodic={handleCreatePeriodic}
      />
    )}
    </AppShell>
  );
}
