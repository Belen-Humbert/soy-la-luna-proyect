import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api/auth", // 👈 acá ponés la URL de tu backend
});

// Middleware para añadir token en las solicitudes protegidas
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;