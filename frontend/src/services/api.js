import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const consultarRENIEC = async (dni) => {
  try {
    const response = await apiClient.post('/reniec/consultar', { dni });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Error en la consulta' };
  }
};

export const consultarSUNAT = async (ruc) => {
  try {
    const response = await apiClient.post('/sunat/consultar', { ruc });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Error en la consulta' };
  }
};

export default apiClient;