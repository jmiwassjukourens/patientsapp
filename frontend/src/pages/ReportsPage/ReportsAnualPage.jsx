import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { FiDollarSign, FiCheckCircle, FiAlertTriangle, FiExternalLink } from "react-icons/fi";
import { fetchAnnualReport } from "../../services/reportsService";
import ReportsYearFilter from "../../components/Reports/ReportsYearFilter";
import styles from "./ReportsAnualPage.module.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title);

export default function ReportsAnualPage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [reportData, setReportData] = useState(null);
  const navigate = useNavigate();

useEffect(() => {
  async function load() {
    try {
      const data = await fetchAnnualReport(year);
      setReportData(data);
    } catch (error) {
      console.error("Error fetching annual report", error);
    }
  }

  load();
}, [year]);


  if (!reportData) return <p>Cargando...</p>;

  const months = reportData.monthlyData.map((d) => d.month);
  const totalCollected = reportData.monthlyData.reduce((a, d) => a + d.collectedIncome, 0);
  const totalPending = reportData.monthlyData.reduce((a, d) => a + d.pendingIncome, 0);
  const totalIncome = totalCollected + totalPending;

  const barData = {
    labels: months,
    datasets: [
      {
        label: "Cobrado",
        data: reportData.monthlyData.map((d) => d.collectedIncome),
        backgroundColor: "#4CAF50",
      },
      {
        label: "Pendiente",
        data: reportData.monthlyData.map((d) => d.pendingIncome),
        backgroundColor: "#EF5350",
      },
    ],
  };

const barOptions = {
  responsive: true,
  maintainAspectRatio: false, 
  interaction: { mode: "index", intersect: false },
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: `Ingresos ${year}`, color: "#333" },
  },
 scales: {
  x: {
    stacked: true,
    ticks: {
      color: "#444",
      maxRotation: 45, 
      minRotation: 45, 
      autoSkip: false, 
    },
    grid: { display: false },
    categoryPercentage: 0.7,
    barPercentage: 0.8,
  },
  y: {
    stacked: true,
    ticks: { color: "#444" },
  },
},

};


  const pieData = {
    labels: ["Cobrado", "Pendiente"],
    datasets: [
      {
        data: [totalCollected, totalPending],
        backgroundColor: ["#4CAF50", "#EF5350"],
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

const handleViewMonth = (monthIndex) => {
  const month = monthIndex + 1;
  const yearStr = String(year);
  const monthStr = String(month).padStart(2, "0");

  const fechaDesde = `${yearStr}-${monthStr}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const fechaHasta = `${yearStr}-${monthStr}-${String(lastDay).padStart(2, "0")}`;

  const estado = encodeURIComponent("PENDIENTE");

  navigate(
    `/sesiones?estado=${estado}&fechaDesde=${encodeURIComponent(
      fechaDesde
    )}&fechaHasta=${encodeURIComponent(fechaHasta)}`
  );
};


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Reporte Anual</h2>
      <div className={styles.containerFilterDashboard}>
        <ReportsYearFilter displayedYear={year} onChangeYear={setYear} />
      </div>

      {/* Resumen anual */}
      <div className={styles.summary}>
        <div className={`${styles.card} ${styles.totalCard}`}>
          <FiDollarSign className={styles.icon} />
          <div>
            <h3>Total</h3>
            <p>${totalIncome.toLocaleString()}</p>
          </div>
        </div>
        <div className={`${styles.card} ${styles.collectedCard}`}>
          <FiCheckCircle className={styles.icon} />
          <div>
            <h3>Cobrado</h3>
            <p>${totalCollected.toLocaleString()}</p>
          </div>
        </div>
        <div
          className={`${styles.card} ${styles.pendingCard} ${
            totalPending > 0 ? styles.warningBorder : ""
          }`}
        >
          <FiAlertTriangle className={styles.icon} />
          <div>
            <h3>Pendiente</h3>
            <p>${totalPending.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className={styles.charts}>
        <div className={`${styles.chart} ${styles.barChart}`}>
          <Bar data={barData} options={barOptions} />
        </div>
        <div className={`${styles.chart} ${styles.pieChart}`}>
          <Pie data={pieData} />
        </div>
      </div>

      {/* Cards mes a mes */}
      <h3 className={styles.monthlyTitle}>Detalle mensual</h3>
      <div className={styles.monthGrid}>
        {reportData.monthlyData.map((m, i) => (
          <div key={m.month} className={styles.monthCard}>
            <h4>{m.month}</h4>
            <p><strong>Cobrado:</strong> ${m.collectedIncome.toLocaleString()}</p>
            <p><strong>Pendiente:</strong> ${m.pendingIncome.toLocaleString()}</p>
            {m.pendingIncome > 0 && (
              <button
                onClick={() => handleViewMonth(i)}
                className={styles.detailsBtn}
              >
                <FiExternalLink /> Ver pendientes
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
