import { apiFetch } from "../api/apiFetch";

const BASE = "api/dashboard";

export function fetchAnnualReport(year = new Date().getFullYear()) {
  return apiFetch(`${BASE}/annual?year=${year}`);
}
