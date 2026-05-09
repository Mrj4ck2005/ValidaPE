import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Decolecta API
  DECOLECTA_TOKEN: process.env.DECOLECTA_TOKEN,
  DECOLECTA_BASE_URL: process.env.DECOLECTA_BASE_URL || 'https://api.decolecta.com',
  
  // CORS
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  
  // Environment flags
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
};

// Validar que exista el token
if (!config.DECOLECTA_TOKEN) {
  console.error('❌ ERROR: DECOLECTA_TOKEN no está configurado en .env');
  process.exit(1);
}