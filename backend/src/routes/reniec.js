import express from 'express';
import { consultarRENIEC } from '../controllers/reniecController.js';

const router = express.Router();

router.post('/consultar', consultarRENIEC);

export default router;