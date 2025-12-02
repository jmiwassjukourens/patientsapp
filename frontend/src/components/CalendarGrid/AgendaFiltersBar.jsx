import { useState, useEffect } from "react";
import styles from "./AgendaFiltersBar.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function AgendaFilterBar({ displayedMonth, onShortcutRangeChange }) {

  const emitirRangoMes = (date) => {
    const desde = new Date(date.getFullYear(), date.getMonth(), 1);
    const hasta = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const dIso = desde.toISOString().split("T")[0];
    const hIso = hasta.toISOString().split("T")[0];
    onShortcutRangeChange?.(dIso, hIso);
  };

  const handleMesAnterior = () => {
    const prev = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() - 1, 1);
    emitirRangoMes(prev);
  };

  const handleMesSiguiente = () => {
    const next = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + 1, 1);
    emitirRangoMes(next);
  };

  const handleMesActual = () => {
    const hoy = new Date();
    emitirRangoMes(hoy);
  };


  const handleArrowPrev = () => handleMesAnterior();
  const handleArrowNext = () => handleMesSiguiente();

  return (
    <div className={styles.filtrosWrapper}>
      <div className={styles.atajosTiempo}>
        <button onClick={handleArrowPrev}>
          <FiChevronLeft size={20} /> 
        </button>
        <button onClick={handleMesAnterior}>Mes anterior</button>
        <button onClick={handleMesActual}>Mes actual</button>
        <button onClick={handleMesSiguiente}>Mes siguiente</button>
        <button onClick={handleArrowNext}>
          <FiChevronRight size={20} /> 
        </button>
      </div>
    </div>
  );
}
