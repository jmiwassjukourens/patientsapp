import { BehaviorSubject } from "rxjs";


let notifications = [
  { id: 1, tipo: "financiera", mensaje: "💰 Tenés 3 sesiones pendientes de pago.", leida: false },
  { id: 2, tipo: "financiera", mensaje: "📉 Este mes recaudaste un 20% menos que el anterior.", leida: false },
  { id: 3, tipo: "sesion", mensaje: "📅 Tenés 5 sesiones agendadas para hoy.", leida: true },
  { id: 4, tipo: "sesion", mensaje: "🔜 Sesión con Juan Pérez en 1 hora.", leida: false },
  { id: 5, tipo: "analitica", mensaje: "🚀 Tu tasa de asistencia subió un 15% este mes.", leida: true },
  { id: 6, tipo: "cliente", mensaje: "🧾 El cliente Ana tiene saldo pendiente desde 03/10.", leida: false },
];

const notificationsSubject = new BehaviorSubject([...notifications]);

const getNotifications = () => notificationsSubject.asObservable();

const updateState = () => notificationsSubject.next([...notifications]);

export const notificationsService = {
  getNotifications,

  markAsRead(id) {
    const n = notifications.find(n => n.id === id);
    if (n) n.leida = true;
    updateState();
  },

  markAllAsRead() {
    notifications = notifications.map(n => ({ ...n, leida: true }));
    updateState();
  },

  deleteNotification(id) {
    notifications = notifications.filter(n => n.id !== id);
    updateState();
  },

  deleteAll() {
    notifications = [];
    updateState();
  },

  getUnreadCount() {
    return notifications.filter(n => !n.leida).length;
  }
};