import React from "react";
import styles from "./PatientsFilterBar.module.css";

export default function PatientsFilterBar({
  filterName,
  setFilterName,
  filterDebt,
  setFilterDebt,
}) {
  return (
    <div className={styles.filterWrapper}>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
        className={styles.inputSearch}
      />

      <label className={styles.switchLabel}>
        <span>Mostrar solo con deuda</span>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={filterDebt}
            onChange={(e) => setFilterDebt(e.target.checked)}
          />
          <span className={styles.slider}></span>
        </label>
      </label>
    </div>
  );
}