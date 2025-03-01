// @ts-nocheck

import {
  createSimulation,
  deleteSimulation,
  getAllSimulations,
  getSimulation,
  simulate,
  updateSimulation,
} from '@/controllers';
import { validateInputs, validateSimulate } from './middleware';

import { Router } from 'express';

const router = Router();

router.post('/create', createSimulation);

router.get('/simulations', getAllSimulations);

router.get('/simulation/:id', getSimulation);

router.put('/simulation/:id', updateSimulation);

router.delete('/simulation/:id', deleteSimulation);

router.post('/simulations/:id/run', simulate);

export default router;
