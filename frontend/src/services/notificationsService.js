import { BehaviorSubject } from "rxjs";
import { apiFetch } from "../api/apiFetch";

const BASE = "api/notifications";

const notificationsSubject = new BehaviorSubject([]);
const emit = (data) => notificationsSubject.next(data);

async function loadNotifications() {
  const data = await apiFetch(`${BASE}`);
  emit(data);
}


async function markAsRead(id) {
  await apiFetch(`${BASE}/${id}/read`, { method: "PUT" });
  await loadNotifications();
}


async function markAllAsRead() {
  await apiFetch(`${BASE}/read/all`, { method: "PUT" });
  await loadNotifications();
}


async function deleteNotification(id) {
  await apiFetch(`${BASE}/${id}`, { method: "DELETE" });
  await loadNotifications();
}


async function deleteAll() {
  await apiFetch(`${BASE}`, { method: "DELETE" });
  await loadNotifications();
}


async function getUnreadCount() {
  return apiFetch(`${BASE}/unread/count`);
}

export const notificationsService = {
  getNotifications: () => notificationsSubject.asObservable(),
  loadNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAll,
  getUnreadCount,
};
