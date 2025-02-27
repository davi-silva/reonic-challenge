export type SimulationInputs = {
  numChargePoints: string;
  arrivalMultiplier: string;
  consumption: string;
  chargingPower: string;
};

export type SimulationInputsNumbers = {
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
