'use client';

import { createSimulation, runSimulation } from '@/services/simulation';
import { useFieldArray, useForm } from 'react-hook-form';

import { simulateEVResolver } from './zod';
import { useMutation } from '@tanstack/react-query';
import { useSimulationStore } from '@/stores';
import { useState } from 'react';

const defaultFields = {
  arrivalMultiplier: '100',
  consumption: '18',
  chargePoints: [{ count: '20', power: '11' }],
};

const useSimulation = () => {
  const { setResults, results, created, setCreated, resetResults } =
    useSimulationStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasResults = results && typeof results === 'object';
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    resolver: simulateEVResolver,
    defaultValues: defaultFields,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    // @ts-ignore
    name: 'chargePoints',
  });

  const mutationForm = useMutation({
    mutationFn: createSimulation,
    mutationKey: ['input'],
    onSuccess: (data) => {
      setValue('arrivalMultiplier', '');
      setValue('consumption', '');
      for (let i = fields.length - 1; i >= 0; i--) {
        remove(i);
        setValue(`chargePoints.${i}.count`, '');
        setValue(`chargePoints.${i}.power`, '');
      }

      setCreated(data);
      mutationSimulation.mutate(data.id);
    },
  });
  const mutationSimulation = useMutation({
    mutationKey: ['simulation'],
    mutationFn: runSimulation,
    onSuccess: (data) => {
      setResults(data);
    },
  });

  // const mutationSimulation = useMutation({
  //   mutationFn: simulateEV,
  //   mutationKey: ['simulate'],
  //   onSuccess: (data) => {
  //     setResults(data);
  //   },
  // });

  const handleSubmitSimulation = (data: any) => {
    const totalChargePoints = data.chargePoints.reduce(
      (sum: number, cp: any) => sum + parseInt(cp.count),
      0
    );
    const avgChargingPower =
      data.chargePoints.reduce(
        (sum: number, cp: any) => sum + parseInt(cp.count) * parseInt(cp.power),
        0
      ) / totalChargePoints;

    const finalData = {
      numChargePoints: totalChargePoints,
      arrivalMultiplier: data.arrivalMultiplier,
      consumption: data.consumption,
      chargingPower: avgChargingPower,
    };
    mutationForm.mutate(finalData);
  };

  // const handleSimulateEV = (inputId: number) => {
  //   mutationSimulation.mutate(inputId);
  // };

  const appendChargingPoint = () => {
    append({
      count: '',
      power: '',
    });
    setCurrentIndex((prev) => {
      if (prev > 0) {
        return (prev += 1);
      }
      return prev;
    });
  };

  const removeChargingPoint = (index: number) => {
    remove(index);
    setCurrentIndex((prev) => {
      if (prev > 0) {
        return (prev -= 1);
      }
      return prev;
    });
  };

  return {
    register,
    handleSubmit,
    handleSubmitSimulation,
    appendChargingPoint,
    removeChargingPoint,
    resetResults,
    errors,
    values: {
      arrivalMultiplier: getValues('arrivalMultiplier'),
      consumption: getValues('consumption'),
    },
    mutationForm,
    // mutationSimulation,
    // mutationHistory,
    results,
    hasResults,
    history,
    created,
    fields,
    currentIndex,
  };
};

export default useSimulation;
