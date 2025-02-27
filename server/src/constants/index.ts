import { NODE_ENV } from './envs';

export * from './envs';
export const isDevelopment = NODE_ENV === 'development';

export const NUM_CHARGEPOINTS = 20;
export const CHARGING_POWER = 11;
export const INTERVAL_DURATION = 0.25;
export const ENERGY_PER_INTERVAL = CHARGING_POWER * INTERVAL_DURATION;
export const DAYS = 365;
export const INTERVALS_PER_DAY = 96;
export const TOTAL_INTERVALS = DAYS * INTERVALS_PER_DAY;
export const ENERGY_PER_100KM = 18;

export const ARRIVAL_PROBABILITIES: number[] = [
  0.0094, 0.0094, 0.0094, 0.0094, 0.0094, 0.0094, 0.0094, 0.0094, 0.0283,
  0.0283, 0.0566, 0.0566, 0.0566, 0.0755, 0.0755, 0.0755, 0.1038, 0.1038,
  0.1038, 0.0472, 0.0472, 0.0472, 0.0094, 0.0094,
];
export const DEMANDS: number[] = [0, 5, 10, 20, 30, 50, 100, 200, 300];
export const DEMAND_PROBABILITIES: number[] = [
  0.3431, 0.049, 0.098, 0.1176, 0.0882, 0.1176, 0.1078, 0.049, 0.0294,
];
