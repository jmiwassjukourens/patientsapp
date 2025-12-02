import { requestManager } from "../context/RequestContext/RequestContext";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/";

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");

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

    if (!res.ok) {
      let errorMsg = `Error HTTP: ${res.status}`;
      if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      try {
        const errorData = await res.json();
        errorMsg = errorData.message || errorMsg;
      } catch {}
      throw new Error(errorMsg);
    }

    if (res.status !== 204) return await res.json();
    return null;
  } catch (error) {
    console.error("❌ Error in centralized fetch:", error.message);
    throw error;
  } finally {
    requestManager.decrement(); 
  }
}
