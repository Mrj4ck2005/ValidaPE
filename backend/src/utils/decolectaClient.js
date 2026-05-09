import axios from 'axios';
import { config } from '../config/environment.js';

const client = axios.create({
  baseURL: config.DECOLECTA_BASE_URL,
  headers: {
    'Authorization': `Bearer ${config.DECOLECTA_TOKEN}`,
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor para manejar errores
client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error Decolecta:', error.response?.data || error.message);
    throw error;
  }
);

export default client;