import { Request, Response } from 'express';
import { runSimulation, simulateConcurrency } from '@/utils';

import { EvSimulate } from './types';
import { prisma } from '@/services';

export const createSimulation = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    return res.status(500).send({
      error,
    });
  }
};

export const getAllSimulations = async (_req: Request, res: Response) => {
  try {
    const simulations = await prisma.simulation.findMany();
    return res.status(200).send(simulations);
  } catch (error) {
    return res.status(500).send({
      error,
    });
  }
};

export const getSimulation = async (
  req: Request<EvSimulate, {}, {}>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const simulation = await prisma.simulation.findUnique({
      where: { id: Number(id) },
    });
    if (!simulation) {
      return res.status(404).json({ error: 'Simulation not found' });
    }

    return res.status(200).send(simulation);
  } catch (error) {
    return res.status(500).send({
      error,
    });
  }
};

export const deleteSimulation = async (
  req: Request<EvSimulate, {}, {}>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const simulation = await prisma.simulation.findUnique({
      where: { id: Number(id) },
    });

    if (!simulation) {
      return res.status(404).json({ error: 'Simulation not found' });
    }

    await prisma.simulation.delete({
      where: { id: Number(id) },
    });
    return res.status(200).send({ id: id });
  } catch (error) {
    return res.status(500).send({
      error,
    });
  }
};

export const simulate = async (
  req: Request<EvSimulate, {}, {}>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const simulation = await prisma.simulation.findUnique({
      where: { id: Number(id) },
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
