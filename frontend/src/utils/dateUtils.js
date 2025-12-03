
const pad = (n) => String(n).padStart(2, "0");


export function backendISOToInputLocal(isoString) {
  if (!isoString) return "";

  const noZ = isoString.endsWith("Z") ? isoString.slice(0, -1) : isoString;

  const match = noZ.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})(\.(\d{1,6}))?$/);
  if (match) {
    const base = match[1]; 
    const frac = match[3] ? match[3].slice(0, 3) : null; 
    const withMs = frac ? `${base}.${frac}` : base;

    const [datePart, timePart] = withMs.split("T");
    const [y, m, d] = datePart.split("-");
    const [hh, mm] = timePart.split(":");
    return `${y}-${m}-${d}T${hh}:${mm}`;
  }


  const simpleMatch = noZ.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})/);
  if (simpleMatch) return simpleMatch[1];


  const d = new Date(noZ);
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}


export function inputLocalToBackendLocalDateTime(inputValue) {
  if (!inputValue) return null;

  const hasSeconds = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(inputValue);
  if (hasSeconds) return inputValue;
  return `${inputValue}:00`; 
}


export function normalizeBackendISO(isoString) {
  if (!isoString) return null;
  const noZ = isoString.endsWith("Z") ? isoString.slice(0, -1) : isoString;
  const match = noZ.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})(\.(\d{1,6}))?$/);
  if (match) {
    const base = match[1];
    const frac = match[3] ? match[3].slice(0, 3) : "000";
    return `${base}.${frac}`;
  }
  const simple = noZ.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})/);
  if (simple) return `${simple[1]}:00`;
  return noZ;
}

export function inputLocalToDate(inputValue) {
  if (!inputValue) return null;

  const m = inputValue.match(/^(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : null;
}
