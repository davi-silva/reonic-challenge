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

type RemoveSimulationData = { id: string };

export type SimulationStore = {
  results?: SimulationResults;
  simulations?: SimulationResults[];
  setResults: (data: SimulationResults) => void;
  resetResults: () => void;
  setSimulations: (data: SimulationResults[]) => void;
  removeSimulation: ({ id }: RemoveSimulationData) => void;
};
