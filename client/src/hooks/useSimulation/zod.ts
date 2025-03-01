import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const regex = /[^0-9.-]/g;

const SimulateEV = z
  .object({
    arrivalMultiplier: z.string(),
    consumption: z.string(),
    chargePoints: z.array(
      z.object({
        count: z.string(),
        power: z.string(),
      })
    ),
  })
  .superRefine(({ arrivalMultiplier, chargePoints }, ctx) => {
    const isArrivalMultiplierValid = arrivalMultiplier.match(regex);
    // const isChargingPowerValid = chargingPower.match(regex);
    // const isConsumptionValid = consumption.match(regex);

    // if (isConsumptionValid && isConsumptionValid?.length > 0) {
    //   ctx.addIssue({
    //     code: 'custom',
    //     path: ['consumption'],
    //     message: 'Consumption must be a number',
    //   });
    // }
    if (isArrivalMultiplierValid && isArrivalMultiplierValid?.length > 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['arrivalMultiplier'],
        message: 'Arrival Multipler must be a number',
      });
    }
    // if (isChargingPowerValid && isChargingPowerValid?.length > 0) {
    //   ctx.addIssue({
    //     code: 'custom',
    //     path: ['chargingPower'],
    //     message: 'Charging Power must be a number',
    //   });
    // }

    const parsedArrivalMultiplier = parseInt(arrivalMultiplier);
    // const parsedConsumption = parseFloat(consumption);
    // const parsedChargingPower = parseFloat(chargingPower);

    if (parsedArrivalMultiplier < 20 || parsedArrivalMultiplier > 200) {
      ctx.addIssue({
        code: 'custom',
        path: ['arrivalMultiplier'],
        message: 'Arrival multiplier must be between 20 and 200',
      });
    }
    // if (parsedConsumption <= 0) {
    //   ctx.addIssue({
    //     code: 'custom',
    //     path: ['consumption'],
    //     message: 'Consumption must be greater than 0',
    //   });
    // }
    // if (parsedChargingPower <= 0) {
    //   ctx.addIssue({
    //     code: 'custom',
    //     path: ['chargingPower'],
    //     message: 'Charging power must be greater than 0',
    //   });
    // }
  });

export const simulateEVResolver = zodResolver(SimulateEV);
