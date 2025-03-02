// @ts-nocheck

import {
  createSimulation,
  deleteSimulation,
  getAllSimulations,
  getSimulation,
  simulate,
  updateSimulation,
} from '@/controllers';
import {
  validateCreateSimulation,
  validateIdParam,
  validateInputs,
  validateSimulate,
} from './middleware';

import { Router } from 'express';

const router = Router();

router.post('/create', validateCreateSimulation, createSimulation);

router.get('/simulations', getAllSimulations);

router.get('/simulation/:id', validateIdParam, getSimulation);

router.delete('/simulation/:id', validateIdParam, deleteSimulation);

router.post('/simulations/:id/run', validateIdParam, simulate);

export default router;
