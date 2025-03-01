export type CreateSimulationInputs = {
  numChargePoints: number;
  arrivalMultiplier: number;
  consumption: number;
  chargingPower: number;
};

export type ConcurrencyData = {
  chargepoints: number;
  concurrency: number;
}[];

export type DayData = {
  time: string;
  power: number;
}[];

export type SimulationResults = {
  id: number;
  numChargePoints: number;
  arrivalMultiplier: number;
  consumption: number;
  chargingPower: number;
  totalEnergy: number;
  maxPower: number;
  theoreticalMaxPower: number;
  concurrencyFactor: number;
  chargingEvents: number;
  createdAt: string;
  concurrencyData: ConcurrencyData;
  dayData: DayData;
};

export type SimulationStore = {
  created?: CreateSimulationInputs;
  results?: SimulationResults;
  setCreated: (data: any) => void;
  setResults: (data: any) => void;
  resetResults: () => void;
};
