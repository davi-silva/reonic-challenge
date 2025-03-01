import { fetchDelete, fetchGet, fetchPost } from '@/services/axios';

import { CreateSimulationInputs } from '@/stores/simulation/types';

export const createSimulation = async (inputs: any) => {
  const parsedInputs: CreateSimulationInputs = {
    arrivalMultiplier: parseInt(inputs.arrivalMultiplier),
    numChargePoints: parseInt(inputs.numChargePoints),
    chargingPower: parseFloat(inputs.chargingPower),
    consumption: parseFloat(inputs.consumption),
  };
  const response = await fetchPost('/ev/create', parsedInputs);
  return response.data;
};

export const runSimulation = async (id: number) => {
  const response = await fetchPost(`/ev/simulations/${id}/run`, {});
  return response.data;
};

export const getAllSimulations = async () => {
  const response = await fetchGet('/ev/simulations');
  return response.data;
};

export const getSimulation = async (id: number) => {
  const response = await fetchGet(`/ev/simulation/${id}`);
  return response.data;
};

export const deleteSimulation = async (id: number) => {
  const response = await fetchDelete(`/ev/simulation/${id}`);
  return response.data;
};
