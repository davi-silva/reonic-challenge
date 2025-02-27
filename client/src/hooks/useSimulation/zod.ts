import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const regex = /[^0-9.-]/g;

const SimulateEV = z
  .object({
    numChargePoints: z.string(),
    arrivalMultiplier: z.string(),
    consumption: z.string(),
    chargingPower: z.string(),
  })
  .superRefine(
    (
      { arrivalMultiplier, chargingPower, consumption, numChargePoints },
      ctx
    ) => {
      const isArrivalMultiplierValid = arrivalMultiplier.match(regex);
      const isChargingPowerValid = chargingPower.match(regex);
      const isConsumptionValid = consumption.match(regex);
      const isNumChargePointsValid = numChargePoints.match(regex);

      if (isNumChargePointsValid && isNumChargePointsValid?.length > 0) {
        ctx.addIssue({
          code: 'custom',
          path: ['numChargePoints'],
          message: 'Number of Charge Ponit must be a number',
        });
      }
      if (isConsumptionValid && isConsumptionValid?.length > 0) {
        ctx.addIssue({
          code: 'custom',
          path: ['consumption'],
          message: 'Consumption must be a number',
        });
      }
      if (isArrivalMultiplierValid && isArrivalMultiplierValid?.length > 0) {
        ctx.addIssue({
          code: 'custom',
          path: ['arrivalMultiplier'],
          message: 'Arrival Multipler must be a number',
        });
      }
      if (isChargingPowerValid && isChargingPowerValid?.length > 0) {
        ctx.addIssue({
          code: 'custom',
          path: ['chargingPower'],
          message: 'Charging Power must be a number',
        });
      }

      const parsedNumChargePoints = parseInt(numChargePoints);
      const parsedArrivalMultiplier = parseInt(arrivalMultiplier);
      const parsedConsumption = parseFloat(consumption);
      const parsedChargingPower = parseFloat(chargingPower);

      if (parsedNumChargePoints < 1) {
        ctx.addIssue({
          code: 'custom',
          path: ['numChargePoints'],
          message: 'Number of Charge Ponit must be greater than or equal to 1',
        });
      }
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
      if (parsedChargingPower <= 0) {
        ctx.addIssue({
          code: 'custom',
          path: ['chargingPower'],
          message: 'Charging power must be greater than 0',
        });
      }
    }
  );

export const simulateEVResolver = zodResolver(SimulateEV);
