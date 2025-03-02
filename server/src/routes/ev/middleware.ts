import { NextFunction, Request, Response } from 'express';
import { ZodValidateCreateSimulation, ZodValidateSimulate } from './zod';

import { EvSimulate } from '@/controllers/ev/types';

export const validateCreateSimulation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const body = req.body;

  if (!body) {
    return res.status(400).send({ error: 'body is required' });
  }

  const validated = ZodValidateCreateSimulation.safeParse(body);

  if (validated.error) {
    return res.status(400).send({
      error: validated.error,
    });
  }

  next();
};

export const validateIdParam = (
  req: Request<EvSimulate, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  const params = req.params;

  if (!params) {
    return res.status(400).send({ error: 'id is required' });
  }

  const validated = ZodValidateSimulate.safeParse(params);

  if (validated.error) {
    return res.status(400).send({
      error: validated.error,
    });
  }

  next();
};
