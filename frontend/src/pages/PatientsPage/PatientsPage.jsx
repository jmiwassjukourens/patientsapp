import { useState, useEffect } from "react";
import styles from "./PatientsPage.module.css";
import PatientsFilterBar from "../../components/PatientsFilterBar/PatientsFilterBar";
import PatientCard from "../../components/PatientCard/PatientCard";
import PatientFormModal from "../../components/Modals/PatientFormModal/PatientFormModal";
import ConfirmModal from "../../components/Modals/ConfirmModal/ConfirmModal.jsx";
import { useNavigate } from "react-router-dom";
import {
  fetchPatients,
  createPatient,
  updatePatient,
  deletePatient,
  notifyDebt,
  notifyAllPatients,
} from "../../services/PatientService.js";
import { useToast } from "../../hooks/useToast.jsx";

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterDebt, setFilterDebt] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);

  const toast = useToast();
  const navigate = useNavigate();


  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const data = await fetchPatients();
      setPatients(data);
      setFiltered(data);

    } catch (e) {
      handleError(e);
    }
  };


  useEffect(() => {
    let temp = [...patients];

    if (filterName.trim() !== "") {
      temp = temp.filter((p) =>
        p.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    if (filterDebt) {
      temp = temp.filter((p) => p.debt > 0);
    }

    setFiltered(temp);
  }, [filterName, filterDebt, patients]);


  const handleError = (e) => {
    switch (e.code) {
      case "PATIENT_NOT_FOUND":
        toast.error("Paciente no encontrado");
        break;

      case "DEBT_EMPTY":
        toast.info("Este paciente no tiene deuda pendiente");
        break;

      case "DELETE_NOT_FOUND":
        toast.error("No existe el paciente que querés eliminar");
        break;

      default:
        toast.error(e.message || "Error inesperado");
    }
  };


  const handleNotifyAll = async () => {
    try {
      await notifyAllPatients();
      toast.info("Notificaciones enviadas a todos los pacientes con deuda");
    } catch (e) {
      handleError(e);
    }
  };

  const handleDelete = (id) => {
    const patient = patients.find((p) => p.id === id);
    setPatientToDelete(patient);
    setOpenConfirm(true);
  };

  const confirmDelete = async () => {
    if (!patientToDelete) return;

    try {
      await deletePatient(patientToDelete.id);

      setPatients((prev) => prev.filter((p) => p.id !== patientToDelete.id));

      toast.info(`Paciente "${patientToDelete.name}" eliminado correctamente`);
    } catch (e) {
      handleError(e);
    }

    setOpenConfirm(false);
    setPatientToDelete(null);
  };

  const handleAddPatient = async (newPatient) => {
    try {
      const saved = await createPatient(newPatient);
      setPatients((prev) => [...prev, saved]);
      toast.info("Paciente creado correctamente");
      setOpenForm(false);
    } catch (e) {
      handleError(e);
    }
  };

  const handleEditPatient = async (updatedPatient) => {
    try {
      const saved = await updatePatient(updatedPatient.id, updatedPatient);

      setPatients((prev) =>
        prev.map((p) => (p.id === saved.id ? saved : p))
      );

      toast.info("Paciente actualizado correctamente");
      setEditingPatient(null);
      setOpenForm(false);
    } catch (e) {
      handleError(e);
    }
  };

  const handleNotifyDebt = async (id) => {
    try {
      await notifyDebt(id);
      toast.info("Notificación enviada");
    } catch (e) {
      handleError(e);
    }
  };

  const handleEdit = (patient) => {
    setEditingPatient(patient);
    setOpenForm(true);
  };

  const handleViewPending = (patient) => {
    navigate(
      `/sesiones?estado=Pendiente&paciente=${encodeURIComponent(patient.name)}`
    );
  };

  const handleViewHistory = (patient) => {
    navigate(`/sesiones?paciente=${encodeURIComponent(patient.name)}`);
  };


  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.title}>Pacientes</h2>

      <PatientsFilterBar
        filterName={filterName}
        setFilterName={setFilterName}
        filterDebt={filterDebt}
        setFilterDebt={setFilterDebt}
      />

      <div className={styles.actionsRow}>
        <button className={styles.notifyAllBtn} onClick={handleNotifyAll}>
          📢 Notificar a todos los pacientes con deuda
        </button>

        <button
          className={styles.addBtn}
          onClick={() => {
            setEditingPatient(null);
            setOpenForm(true);
          }}
        >
          ➕ Dar alta paciente
        </button>
      </div>

      <div className={styles.cardsGrid}>
        {filtered.map((p) => (
          <PatientCard
            key={p.id}
            patient={p}
            onEdit={() => handleEdit(p)}
            onDelete={() => handleDelete(p.id)}
            onNotify={handleNotifyDebt}
            onViewPending={() => handleViewPending(p)}
            onViewHistory={() => handleViewHistory(p)}
          />
        ))}
      </div>

      {openForm && (
        <PatientFormModal
          open={openForm}
          onClose={() => {
            setOpenForm(false);
            setEditingPatient(null);
          }}
          onSubmit={editingPatient ? handleEditPatient : handleAddPatient}
          initialData={editingPatient}
        />
      )}

      <ConfirmModal
        show={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={confirmDelete}
        title="Eliminar paciente"
        message={`¿Seguro que deseas eliminar a "${patientToDelete?.name}"?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        confirmColor="danger"
      />
    </div>
  );
}