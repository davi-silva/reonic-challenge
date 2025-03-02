import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const regex = /[^0-9.-]/g;

const SimulateEV = z
  .object({
    arrivalMultiplier: z
      .string()
      .min(1, { message: 'Arrival Multipler must be a number' }),
    consumption: z.string().min(1, { message: 'Consumption must be a number' }),
    chargePoints: z.array(
      z.object({
        count: z
          .string()
          .min(1, { message: 'Number of Charge Points must be a number' }),
        power: z
          .string()
          .min(1, { message: 'Charging Power must be a number' }),
      })
    ),
  })
  .superRefine(({ arrivalMultiplier, chargePoints, consumption }, ctx) => {
    const isArrivalMultiplierValid = arrivalMultiplier.match(regex);
    const isConsumptionValid = consumption.match(regex);

    if (isArrivalMultiplierValid && isArrivalMultiplierValid?.length > 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['arrivalMultiplier'],
        message: 'Arrival Multipler must be a number',
      });
    }
    if (isConsumptionValid && isConsumptionValid?.length > 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['consumption'],
        message: 'Consumption must be a number',
      });
    }

    const parsedArrivalMultiplier = parseInt(arrivalMultiplier);
    const parsedConsumption = parseFloat(consumption);

    if (parsedArrivalMultiplier < 20 || parsedArrivalMultiplier > 200) {
      ctx.addIssue({
        code: 'custom',
        path: ['arrivalMultiplier'],
        message: 'Arrival multiplier must be between 20 and 200',
      });
    }
    if (parsedConsumption <= 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['consumption'],
        message: 'Consumption must be greater than 0',
      });
    }

    chargePoints.forEach((chargePoint, index) => {
      if (regex.test(chargePoint.count)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [`chargePoints.${index}.count`],
          message: `Number of Charge Points must be a  number`,
        });
      }
      if (regex.test(chargePoint.power)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [`chargePoints.${index}.power`],
          message: `Charging Power must be a number`,
        });
      }
      if (regex.test(chargePoint.count) && Number(chargePoint.count) <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [`chargePoints.${index}.count`],
          message: `Number of Charge Points must be greater than 0`,
        });
      }
      if (regex.test(chargePoint.power) && Number(chargePoint.power) <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [`chargePoints.${index}.power`],
          message: `Charging Power must be greater than 0`,
        });
      }
    });
  });

export const simulateEVResolver = zodResolver(SimulateEV);
