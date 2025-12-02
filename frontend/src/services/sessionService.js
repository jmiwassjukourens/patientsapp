import { apiFetch } from "../api/apiFetch";

const BASE = "api/sessions";

export function getSessions() {
  return apiFetch(`${BASE}`);
}

export function addSession(session) {

  return apiFetch(`${BASE}/${session.patientId}`, {
    method: "POST",
    body: JSON.stringify(session),
  });
}

export function updateSession(id, patch) {
  return apiFetch(`${BASE}/${id}`, {
    method: "PUT",
    body: JSON.stringify(patch),
  });
}

export function deleteSession(id) {
  return apiFetch(`${BASE}/${id}`, {
    method: "DELETE",
  });
}

export function markAsPaid(id) {
  return apiFetch(`${BASE}/${id}/paid`, {
    method: "PUT",
  });
}
