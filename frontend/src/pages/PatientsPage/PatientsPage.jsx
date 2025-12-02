import React, { useState, useEffect } from "react";
import styles from "./PatientsPage.module.css";
import PatientsFilterBar from "../../components/PatientsFilterBar/PatientsFilterBar";
import PatientCard from "../../components/PatientCard/PatientCard";
import PatientFormModal from "../../components/Modals/PatientFormModal/PatientFormModal";
import ConfirmModal from "../../components/Modals/ConfirmModal/ConfirmModal.jsx";
import { getPatients } from "../../services/PatientService.js";
import { useNavigate } from "react-router-dom";

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterDebt, setFilterDebt] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const data = getPatients();
    setPatients(data);
    setFiltered(data);
  }, []);

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

  const handleNotifyAll = () => {
    alert("Notificaciones enviadas a todos los pacientes con deuda 💬");
  };

  const handleDelete = (id) => {
    const patient = patients.find((p) => p.id === id);
    setPatientToDelete(patient);
    setOpenConfirm(true);
  };

  const confirmDelete = () => {
    if (!patientToDelete) return;
    setPatients((prev) => prev.filter((p) => p.id !== patientToDelete.id));
    setOpenConfirm(false);
    setPatientToDelete(null);
  };

  const handleAddPatient = (newPatient) => {
    setPatients((prev) => [...prev, newPatient]);
    setOpenForm(false);
  };

  const handleEditPatient = (updatedPatient) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === updatedPatient.id ? updatedPatient : p))
    );
    setEditingPatient(null);
    setOpenForm(false);
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
        message={`¿Seguro que deseas eliminar a "${patientToDelete?.name}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        confirmColor="danger"
      />
    </div>
  );
}