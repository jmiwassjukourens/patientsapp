import styles from "../CalendarGrid/AgendaFiltersBar.module.css";
import { FiChevronLeft, FiChevronRight, FiFilter } from "react-icons/fi";


export default function ReportsFilters({ displayedYear, onChangeYear }) {
  
  const handlePrev = () => onChangeYear(displayedYear - 1);
  const handleNext = () => onChangeYear(displayedYear + 1);
  const handleCurrent = () => onChangeYear(new Date().getFullYear());

  return (
    <div className={styles.filtrosWrapper}>
      <div className={styles.atajosTiempo}>
        <button onClick={handlePrev}><FiChevronLeft size={10}  /> Año anterior</button>
        <button onClick={handleCurrent}>Año actual</button>
        <button onClick={handleNext}>Año siguiente <FiChevronRight size={10}  /></button>
      </div>
    </div>
  );
}