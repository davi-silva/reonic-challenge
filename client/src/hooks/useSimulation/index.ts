'use client';

import { SimulationInputs, SimulationResults } from './types';
import { createSimulationInput, simulateEV } from '@/services/simulation';
import { useEffect, useState } from 'react';

import { simulateEVResolver } from './zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

const defaultFields = {
  numChargePoints: '20',
  arrivalMultiplier: '100',
  consumption: '18',
  chargingPower: '11',
};

const useSimulation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    resolver: simulateEVResolver,
    defaultValues: defaultFields,
  });
  const mutation = useMutation({
    mutationFn: createSimulationInput,
    mutationKey: ['input'],
  });

  const mutationSimulation = useMutation({
    mutationFn: simulateEV,
    mutationKey: ['simulate'],
  });

  const handleSubmitSimulation = (data: SimulationInputs) => {
    mutation.mutate(data);
  };

  const handleSimulateEV = (inputId: number) => {
    mutationSimulation.mutate(inputId);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      setValue('arrivalMultiplier', '');
      setValue('chargingPower', '');
      setValue('consumption', '');
      setValue('numChargePoints', '');
    }
  }, [mutation.isSuccess, mutation.data]);

  useEffect(() => {
    if (mutation.data) {
      handleSimulateEV(mutation.data.id);
    }
  }, [mutation.data]);

  return {
    register,
    handleSubmit,
    handleSubmitSimulation,
    errors,
    values: {
      numChargePoints: getValues('numChargePoints'),
      arrivalMultiplier: getValues('arrivalMultiplier'),
      consumption: getValues('consumption'),
      chargingPower: getValues('chargingPower'),
    },
    mutation,
    mutationSimulation,
  };
};

export default useSimulation;
