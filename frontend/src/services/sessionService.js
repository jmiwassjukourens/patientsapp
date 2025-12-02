
let sessions = [
  {
    id: 1,
    fecha: "2025-10-10T10:00:00",
    fechaDePago: null,
    estado: "Pendiente",
    paciente: { nombre: "Juan Pérez" },
    precio: 1500,
    adjunto: "recibo-juan.pdf",
  },
  {
    id: 2,
    fecha: "2025-10-11T14:30:00",
    fechaDePago: "2025-10-09T18:00:00",
    estado: "Pagado",
    paciente: { nombre: "Juan Pérez" },
    precio: 2000,
    adjunto: null,
  },
  {
    id: 3,
    fecha: "2025-10-10T16:00:00",
    fechaDePago: null,
    estado: "Pendiente",
    paciente: { nombre: "Carlos Díaz" },
    precio: 300,
    adjunto: null,  
  },
    {
    id: 4,
    fecha: "2025-10-10T16:00:00",
    fechaDePago: "2025-12-10T16:00:00",
    estado: "Pagado",
    paciente: { nombre: "Carlos Díaz" },
    precio: 1500,
    adjunto: null,
  },
    {
    id: 5,
    fecha: "2025-11-11T10:00:00",
    fechaDePago: null,
    estado: "Pendiente",
    paciente: { nombre: "Juan Pérez" },
    precio: 1500,
    adjunto: "recibo-juan.pdf",
  }
];

let nextId = 6;

export function getSessions() {

  return Promise.resolve([...sessions]);
}

export function addSession(session) {
  const s = { ...session, id: nextId++ };
  sessions.push(s);
  return Promise.resolve(s);
}

export function deleteSession(id) {
  sessions = sessions.filter((x) => x.id !== id);
  return Promise.resolve();
}

export function updateSession(id, patch) {
  sessions = sessions.map((s) => (s.id === id ? { ...s, ...patch } : s));
  return Promise.resolve(sessions.find((s) => s.id === id));
}
