 import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function getAdminToken() {
  return localStorage.getItem("admin_token");
}

export function setAdminToken(token) {
  if (token) localStorage.setItem("admin_token", token);
  else localStorage.removeItem("admin_token");
}

export const adminApi = axios.create({
  baseURL: API,
});

adminApi.interceptors.request.use((config) => {
  const token = getAdminToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

