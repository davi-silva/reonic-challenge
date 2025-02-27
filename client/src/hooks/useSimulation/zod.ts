import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const SimulateEV = z.object({
  numChargePoints: z.number(),
  arrivalMultiplier: z.number(),
  consumption: z.number(),
  chargingPower: z.number(),
});

export const simulateEVResolver = zodResolver(SimulateEV);
