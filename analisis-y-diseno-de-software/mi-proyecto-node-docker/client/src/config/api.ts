// Configuración de la API
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  login: `${API_URL}/api/login`,
  register: `${API_URL}/api/register`,
  // Agregá más endpoints según tu backend
};