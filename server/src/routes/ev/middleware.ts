import { NextFunction, Request, Response } from 'express';
import { ZodValidateInputs, ZodValidateSimulate } from './zod';

export const validateInputs = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const body = req.body;

  if (!body) {
    return res.status(400).send({ error: 'body is required' });
  }

  const validated = ZodValidateInputs.safeParse(body);

  if (validated.error) {
    return res.status(400).send({
      error: validated.error,
    });
  }

  next();
};

export const validateSimulate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const body = req.body;

  if (!body) {
    return res.status(400).send({ error: 'body is required' });
  }

  const validated = ZodValidateSimulate.safeParse(body);

  if (validated.error) {
    return res.status(400).send({
      error: validated.error,
    });
  }

  next();
};
