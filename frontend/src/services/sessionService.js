import { apiFetch } from "../api/apiFetch";

const BASE = "api/sessions";

export function getSessions() {
  return apiFetch(`${BASE}`);
}



export function updateSession(id, patch) {
  const dto = {
    fecha: patch.fecha,
    fechaDePago: patch.fechaDePago || null,
    estado: patch.estado,
    precio: patch.precio,
  };

  return apiFetch(`${BASE}/${id}`, {
    method: "PUT",
    body: JSON.stringify(dto),
  });
}

export function deleteSession(id) {
  return apiFetch(`${BASE}/${id}`, {
    method: "DELETE",
  });
}


export function markAsPaid(id, fechaDePago = null) {
  const opts = { method: "PUT", headers: { "Content-Type": "application/json" } };
  if (fechaDePago) opts.body = JSON.stringify({ fechaDePago });
  return apiFetch(`${BASE}/${id}/paid`, opts);
}



export function addSessionForPatient(patientId, dto) {
  return apiFetch(`${BASE}/${patientId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
}


export function addPeriodicSessionsForPatient(patientId, periodicPayload) {
  return apiFetch(`${BASE}/${patientId}/periodic`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(periodicPayload),
  });
}