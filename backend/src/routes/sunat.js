import express from 'express';
import { consultarSUNAT } from '../controllers/sunatController.js';

const router = express.Router();

router.post('/consultar', consultarSUNAT);

export default router;