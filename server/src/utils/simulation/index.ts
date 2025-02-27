import {
  ARRIVAL_PROBABILITIES,
  DEMANDS,
  DEMAND_PROBABILITIES,
  INTERVALS_PER_DAY,
  INTERVAL_DURATION,
  TOTAL_INTERVALS,
} from '@/constants';

import { ChargePoint } from './types';
import { sampleDemand } from '@/utils';

export const runSimulation = (
  numChargePoints: number,
  arrivalMultiplier: number,
  consumption: number,
  chargingPower: number,
): { totalEnergy: number; peakPower: number; concurrency: number } => {
  // Initialize charge points
  const chargePoints: ChargePoint[] = Array(numChargePoints)
    .fill(null)
    .map(() => ({
      isOccupied: false,
      remainingEnergy: 0,
    }));

  let totalEnergy = 0;
  let maxPower = 0;

  // Simulate over all intervals
  for (let interval = 0; interval < TOTAL_INTERVALS; interval++) {
    const hour = Math.floor((interval % INTERVALS_PER_DAY) / 4);
    const pHour = ARRIVAL_PROBABILITIES[hour];
    const pInterval = (pHour / 4) * (arrivalMultiplier / 100);

    let intervalTotalPower = 0;

    for (const cp of chargePoints) {
      if (cp.isOccupied) {
        const energyDelivered = Math.min(
          chargingPower * INTERVAL_DURATION,
          cp.remainingEnergy,
        );
        const power = energyDelivered / INTERVAL_DURATION;
        intervalTotalPower += power;
        totalEnergy += energyDelivered;
        cp.remainingEnergy -= energyDelivered;

        if (cp.remainingEnergy <= 0) cp.isOccupied = false;
      } else {
        if (Math.random() < pInterval) {
          const demandKm = sampleDemand(DEMANDS, DEMAND_PROBABILITIES);
          if (demandKm > 0) {
            cp.remainingEnergy = (demandKm / 100) * consumption; // Convert km to kWh
            cp.isOccupied = true;
          }
        }
      }
    }

    maxPower = Math.max(maxPower, intervalTotalPower);
  }

  // Calculate concurrency factor
  const theoreticalMaxPower = numChargePoints * chargingPower;
  const concurrency =
    theoreticalMaxPower > 0 ? maxPower / theoreticalMaxPower : 0;

  return {
    totalEnergy,
    peakPower: maxPower,
    concurrency,
  };
};
