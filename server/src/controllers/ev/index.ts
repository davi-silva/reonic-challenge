import { EvInputs, EvSimulate } from './types';
import { Request, Response } from 'express';
import { runSimulation, simulateConcurrency } from '@/utils';

import { prisma } from '@/services';

export const createSimulation = async (req: Request, res: Response) => {
  const { numChargePoints, arrivalMultiplier, consumption, chargingPower } =
    req.body;
  const simulation = await prisma.simulation.create({
    data: {
      numChargePoints,
      arrivalMultiplier: arrivalMultiplier || 100,
      consumption: consumption || 18,
      chargingPower: chargingPower || 11,
    },
  });
  return res.status(200).send(simulation);
};

export const getAllSimulations = async (_req: Request, res: Response) => {
  const simulations = await prisma.simulation.findMany();
  return res.status(200).send(simulations);
};

export const getSimulation = async (req: Request, res: Response) => {
  const simulation = await prisma.simulation.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!simulation)
    return res.status(404).json({ error: 'Simulation not found' });
  return res.status(200).send(simulation);
};

export const updateSimulation = async (req: Request, res: Response) => {
  const { numChargePoints, arrivalMultiplier, consumption, chargingPower } =
    req.body;
  const simulation = await prisma.simulation.update({
    where: { id: Number(req.params.id) },
    data: { numChargePoints, arrivalMultiplier, consumption, chargingPower },
  });
  return res.status(200).send(simulation);
};

export const deleteSimulation = async (req: Request, res: Response) => {
  await prisma.simulation.delete({
    where: { id: Number(req.params.id) },
  });
  return res.status(200).send();
};

export const simulate = async (
  req: Request<EvSimulate, {}, {}>,
  res: Response,
) => {
  try {
    const simulation = await prisma.simulation.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!simulation) {
      return res.status(404).json({ error: 'Input not found' });
    }

    const { numChargePoints, arrivalMultiplier, consumption, chargingPower } =
      simulation;

    const results = runSimulation({
      numChargePoints,
      arrivalMultiplier,
      consumption,
      chargingPower,
      seed: 'fixed',
    });

    // Run concurrency simulations
    const concurrencyData = simulateConcurrency({
      arrivalMultiplier,
      consumption,
      chargingPower,
    });

    const updatedSimulation = await prisma.simulation.update({
      where: { id: simulation.id },
      data: {
        totalEnergy: results.totalEnergy,
        maxPower: results.maxPower,
        theoreticalMaxPower: results.theoreticalMaxPower,
        concurrencyFactor: results.concurrencyFactor,
        chargingEvents: results.chargingEvents,
      },
    });

    return res.status(200).send({
      ...updatedSimulation,
      dayData: results.dayData,
      concurrencyData,
    });
  } catch (error) {
    return res.status(500).send({
      error,
    });
  }
};
