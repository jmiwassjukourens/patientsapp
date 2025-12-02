// api/apiFetch.js
import { requestManager } from "../context/RequestContext/RequestContext";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/";

export async function apiFetch(endpoint, options = {}) {
  const token = sessionStorage.getItem("token");

  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  requestManager.increment();

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    const contentType = res.headers.get("Content-Type") || "";


    if (!res.ok) {
      let backendError = { code: "UNKNOWN", message: "Unexpected error" };

      if (contentType.includes("application/json")) {
        try {
          const data = await res.json();
          backendError = data;
        } catch {}
      }

      if (res.status === 401) {
        sessionStorage.removeItem("token");
        window.location.href = "/login";
      }

      throw backendError;
    }


    if (res.status === 204) return null;


    if (contentType.includes("application/json")) {
      return await res.json();
    }

    return null;
  } catch (err) {
    console.error("❌ Centralized API error:", err);
    throw err;
  } finally {
    requestManager.decrement();
  }
}
