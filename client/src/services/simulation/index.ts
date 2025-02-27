import {
  SimulationInputs,
  SimulationInputsNumbers,
} from '@/hooks/useSimulation/types';

import { fetchPost } from '@/services/axios';

export const createSimulationInput = async (inputs: SimulationInputs) => {
  const parsedInputs: SimulationInputsNumbers = {
    arrivalMultiplier: parseInt(inputs.arrivalMultiplier),
    numChargePoints: parseInt(inputs.numChargePoints),
    chargingPower: parseFloat(inputs.chargingPower),
    consumption: parseFloat(inputs.consumption),
  };
  const response = await fetchPost('/ev/inputs', parsedInputs);
  return response.data;
};

export const simulateEV = async (inputId: number) => {
  const response = await fetchPost('/ev/simulate', { inputId });
  return response.data;
};
