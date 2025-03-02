import {
  ARRIVAL_PROBABILITIES,
  DEMANDS,
  DEMAND_PROBABILITIES,
  TICKS_PER_DAY,
  TICK_DURATION,
  TOTAL_TICKS,
} from '@/constants';

import { ChargePoint } from './types';
import { sampleDemand } from '@/utils';
import seedrandom from 'seedrandom';

// Helper function to check if a day is within the DST period
function isDST(dayOfYear: number) {
  const dstStart = 71; // March 12, 2023 (day 71, 0-based)
  const dstEnd = 309; // November 5, 2023 (day 309, 0-based)
  return dayOfYear >= dstStart && dayOfYear < dstEnd;
}

// Main simulation function
export const runSimulation = ({
  numChargePoints = 15,
  arrivalMultiplier = 100,
  consumption = 18,
  chargingPower = 11,
  seed = 'fixed-seed',
}) => {
  Math.random = seedrandom(seed);

  const powerPerChargepoint = chargingPower;
  const energyPerTick = powerPerChargepoint * TICK_DURATION;
  const adjustedConsumption = consumption;

  const hours = ARRIVAL_PROBABILITIES.map((p) => (p * arrivalMultiplier) / 100);

  function sampleKm() {
    const r = Math.random();
    for (let i = 0; i < DEMAND_PROBABILITIES.length; i++) {
      if (r < DEMAND_PROBABILITIES[i]) return DEMANDS[i];
    }
    return DEMANDS[DEMANDS.length - 1];
  }

  let chargepoints = Array.from({ length: numChargePoints }, () => ({
    state: 'available',
    remainingEnergy: 0,
  }));

  let totalEnergy = 0;
  let maxPower = 0;
  let chargingEvents = 0;
  const powerPerTick = new Array(TOTAL_TICKS).fill(0); // Use regular array instead of Float64Array for simplicity
  let maxPowerDay = 0;

  for (let tick = 0; tick < TOTAL_TICKS; tick++) {
    let currentPower = 0;
    const dayOfYear = Math.floor(tick / TICKS_PER_DAY);
    const tickInDay = tick % TICKS_PER_DAY;
    let hour = Math.floor(tickInDay / 4);

    if (isDST(dayOfYear)) {
      hour = (hour - 1 + 24) % 24;
    }

    for (let cp of chargepoints) {
      if (cp.state === 'available') {
        const pArrival = hours[hour] / 4;
        if (Math.random() < pArrival) {
          const km = sampleKm();
          if (km > 0) {
            const energyNeeded = (km / 100) * adjustedConsumption;
            cp.remainingEnergy = energyNeeded;
            cp.state = 'charging';
            chargingEvents++;
          }
        }
      }

      if (cp.state === 'charging') {
        const energyDelivered = Math.min(cp.remainingEnergy, energyPerTick);
        const power = energyDelivered / 0.25;
        currentPower += power;
        totalEnergy += energyDelivered;
        cp.remainingEnergy -= energyDelivered;
        if (cp.remainingEnergy <= 0) cp.state = 'available';
      }
    }

    powerPerTick[tick] = currentPower;
    if (currentPower > maxPower) {
      maxPower = currentPower;
      maxPowerDay = dayOfYear;
    }
  }

  const theoreticalMaxPower = numChargePoints * powerPerChargepoint;
  const concurrencyFactor = maxPower / theoreticalMaxPower;

  // Extract exemplary day data (max power day)
  const dayDataStart = maxPowerDay * TICKS_PER_DAY;
  const dayData = Array.from({ length: TICKS_PER_DAY }, (_, i) => {
    const hours = Math.floor(i / 4)
      .toString()
      .padStart(2, '0');
    const minutes = ((i % 4) * 15).toString().padStart(2, '0');
    return {
      time: `${hours}:${minutes}`,
      power: powerPerTick[dayDataStart + i] || 0,
    };
  });

  return {
    totalEnergy,
    theoreticalMaxPower,
    maxPower,
    concurrencyFactor,
    chargingEvents,
    dayData,
  };
};

// Simulate concurrency for 1 to 30 chargepoints
export const simulateConcurrency = ({
  arrivalMultiplier = 100,
  consumption = 18,
  chargingPower = 11,
  seed = 'fixed-seed',
}) => {
  const concurrencyData = [];
  for (let n = 1; n <= 30; n++) {
    const { concurrencyFactor } = runSimulation({
      numChargePoints: n,
      arrivalMultiplier,
      consumption,
      chargingPower,
      seed: `${seed}-${n}`,
    });
    concurrencyData.push({ chargepoints: n, concurrency: concurrencyFactor });
  }
  return concurrencyData;
};
