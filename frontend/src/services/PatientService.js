import { apiFetch } from "../api/apiFetch";
const BASE = "api/patients";

export function fetchPatients() {
  return apiFetch(`${BASE}`);
}

export function createPatient(patient) {
  return apiFetch(`${BASE}`, {
    method: "POST",
    body: JSON.stringify(patient),
  });
}

export function updatePatient(id, patient) {
  return apiFetch(`${BASE}/${id}`, {
    method: "PUT",
    body: JSON.stringify(patient),
  });
}

export function deletePatient(id) {
  return apiFetch(`${BASE}/${id}`, {
    method: "DELETE",
  });
}

export function notifyDebt(id) {
  return apiFetch(`${BASE}/${id}/notify-debt`, {
    method: "POST",
  });
}

export function notifyAllPatients() {
  return apiFetch(`${BASE}/notify-debt/all`, {
    method: "POST",
  });
}
