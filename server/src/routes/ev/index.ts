// @ts-nocheck

import { evInputs, evSimulate } from '@/controllers';
import { validateInputs, validateSimulate } from './middleware';

import { Router } from 'express';

const router = Router();

router.post('/inputs', validateInputs, evInputs);

router.post('/simulate', validateSimulate, evSimulate);

export default router;
