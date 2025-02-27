import { EvInputs, EvSimulate } from './types';
import { Request, Response } from 'express';
import { generateUUID, runSimulation } from '@/utils';

import { prisma } from '@/services';

export const evInputs = async (
  req: Request<{}, {}, EvInputs>,
  res: Response,
) => {
  try {
    const { numChargePoints, arrivalMultiplier, consumption, chargingPower } =
      req.body;

    const input = await prisma.simulationInput.create({
      data: {
        numChargePoints,
        arrivalMultiplier,
        consumption,
        chargingPower,
      },
    });

    return res.status(200).send(input);
  } catch (error) {
    return res.status(500).send({
      error,
    });
  }
};

export const evSimulate = async (
  req: Request<{}, {}, EvSimulate>,
  res: Response,
) => {
  try {
    const { inputId } = req.body;

    const input = await prisma.simulationInput.findUnique({
      where: { id: inputId },
    });

    if (!input) {
      return res.status(404).json({ error: 'Input not found' });
    }

    const { numChargePoints, arrivalMultiplier, consumption, chargingPower } =
      input;

    const { totalEnergy, peakPower, concurrency } = runSimulation(
      numChargePoints,
      arrivalMultiplier,
      consumption,
      chargingPower,
    );

    const result = await prisma.simulationResult.create({
      data: {
        inputId,
        totalEnergy,
        peakPower,
        concurrency,
      },
    });

    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send({
      error,
    });
  }
};
