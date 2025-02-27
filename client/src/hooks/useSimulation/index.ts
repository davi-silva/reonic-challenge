import { SimulationInputs, SimulationResults } from './types';
import { useFieldArray, useForm } from 'react-hook-form';

import { simulateEVResolver } from './zod';
import { useState } from 'react';

const defaultFields = {
  numChargePoints: 20,
  arrivalMultiplier: 100,
  consumption: 18,
  chargingPower: 11,
};

const useSimulation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: simulateEVResolver,
    defaultValues: defaultFields,
  });

  const [inputs, setInputs] = useState<SimulationInputs>({
    numChargePoints: 20,
    arrivalMultiplier: 100,
    consumption: 18,
    chargingPower: 11,
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SimulationResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof SimulationInputs, value: string) => {
    const numValue =
      field === 'numChargePoints' ? parseInt(value, 10) : parseFloat(value);
    if (!isNaN(numValue)) {
      setInputs((prev) => ({ ...prev, [field]: numValue }));
    }
  };

  const handleSubmitSimulation = async (data: any) => {
    console.log({ data });
  };

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
  };
};

export default useSimulation;
