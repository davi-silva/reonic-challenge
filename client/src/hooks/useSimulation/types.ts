export type SimulationInputs = {
  numChargePoints: number;
  arrivalMultiplier: number;
  consumption: number;
  chargingPower: number;
};

export type SimulationResults = {
  totalEnergy: number;
  peakPower: number;
  concurrency: number;
};
