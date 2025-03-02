import { z } from 'zod';

export const ZodValidateCreateSimulation = z.object({
  numChargePoints: z.number(),
  arrivalMultiplier: z.number(),
  consumption: z.number(),
  chargingPower: z.number(),
});

export const ZodValidateSimulate = z.object({
  id: z.string(),
});
