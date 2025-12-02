import { useMemo } from "react";
import styles from "./CalendarGrid.module.css";
import SessionChip from "../../components/SessionChip/SessionChip";

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function endOfDay(d) {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}

function addDays(d, amount) {
  const r = new Date(d);
  r.setDate(r.getDate() + amount);
  return r;
}

function startOfWeekMonday(d) {
  // devuelve fecha del lunes de la semana de d
  const x = new Date(d);
  const day = x.getDay(); // 0 domingo
  const diff = day === 0 ? -6 : 1 - day;
  x.setDate(x.getDate() + diff);
  x.setHours(0,0,0,0);
  return x;
}

function endOfWeekSunday(d) {
  const start = startOfWeekMonday(d);
  const end = addDays(start, 6);
  end.setHours(23,59,59,999);
  return end;
}

function buildDates(startDate, endDate) {
  const arr = [];
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    arr.push(new Date(d));
  }
  return arr;
}

export default function CalendarGrid({ displayedMonth, sessions, onCreateForDate, onDelete, onMarkPaid, showActions }) {
  // month boundaries
  const monthStart = useMemo(() => new Date(displayedMonth.getFullYear(), displayedMonth.getMonth(), 1), [displayedMonth]);
  const monthEnd = useMemo(() => new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + 1, 0), [displayedMonth]);

  // calendar window (complete weeks to show full rows)
  const calendarStart = useMemo(() => startOfWeekMonday(monthStart), [monthStart]);
  const calendarEnd = useMemo(() => endOfWeekSunday(monthEnd), [monthEnd]);

  const dates = useMemo(() => buildDates(calendarStart, calendarEnd), [calendarStart, calendarEnd]);

  // group sessions by date string for quick lookup (sessions are already filtered to the month in AgendaPage)
  const grouped = useMemo(() => {
    const map = {};
    (sessions || []).forEach((s) => {
      const key = new Date(s.fecha).toISOString().slice(0, 10);
      if (!map[key]) map[key] = [];
      map[key].push(s);
    });
    Object.keys(map).forEach((k) => map[k].sort((a,b) => new Date(a.fecha) - new Date(b.fecha)));
    return map;
  }, [sessions]);

  // chunk dates into weeks (arrays of 7)
  const weeks = useMemo(() => {
    const w = [];
    for (let i = 0; i < dates.length; i += 7) {
      w.push(dates.slice(i, i + 7));
    }
    return w;
  }, [dates]);

  return (
    <div className={styles.gridWrapper}>
      <div className={styles.weekDayHeader}>
        {["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"].map((d) => (
          <div key={d} className={styles.weekdayCell}>{d}</div>
        ))}
      </div>

      <div className={styles.calendar}>
        {weeks.map((week, idx) => (
          <div className={styles.weekRow} key={idx}>
            {week.map((d) => {
              const key = d.toISOString().slice(0, 10);
              const daySessions = grouped[key] || [];
              const isToday = new Date().toISOString().slice(0, 10) === key;
              const isOtherMonth = d.getMonth() !== monthStart.getMonth();

              return (
                <div
                  className={`${styles.cell} ${isOtherMonth ? styles.otherMonth : ""}`}
                  key={key}
                >
                  <div className={styles.cellHeader}>
                    <div>
                      <div className={styles.dayNumber}>{d.getDate()}</div>
                      <div className={styles.dayName}>
                        {d.toLocaleDateString("es-ES", { weekday: "short" })}
                      </div>
                    </div>
                    <button
                      className={styles.cellAdd}
                      title={`Crear sesión ${key}`}
                      onClick={() => onCreateForDate(key)}
                    >
                      +
                    </button>
                  </div>

                  <div className={`${styles.cellBody} ${isToday ? styles.todayBg : ""}`}>
                    {daySessions.length === 0 ? (
                      <div className={styles.emptyText}>—</div>
                    ) : (
                      daySessions.map((s) => (
                        <SessionChip
                          key={s.id}
                          session={s}
                          onCancel={onDelete}
                          onMarkPaid={(fechaPago) => onMarkPaid(s.id, fechaPago)}
                          showActions={showActions}
                        />
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
