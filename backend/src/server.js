import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config/environment.js';
import { errorHandler } from './middleware/errorHandler.js';
import reniecRoutes from './routes/reniec.js';
import sunatRoutes from './routes/sunat.js';

const app = express();

// Middlewares de seguridad
app.use(helmet());
app.use(cors({
  origin: config.FRONTEND_URL,
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 peticiones
  message: 'Demasiadas solicitudes, intenta más tarde',
});
app.use(limiter);

// Body parser
app.use(express.json());

// Routes
app.use('/api/reniec', reniecRoutes);
app.use('/api/sunat', sunatRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handler
app.use(errorHandler);

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(config.PORT, () => {
  console.log(`🚀 Backend ejecutándose en puerto ${config.PORT}`);
  console.log(`📌 Ambiente: ${config.NODE_ENV}`);
});