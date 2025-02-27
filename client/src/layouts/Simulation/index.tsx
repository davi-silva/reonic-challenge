'use client';

import { Button, Input } from '@/components';
import React, { FC } from 'react';

import styles from './index.module.scss';
import { useSimulation } from '@/hooks';

const Simulation = () => {
  const { errors, handleSubmit, handleSubmitSimulation, register, mutation } =
    useSimulation();

  return (
    <form
      onSubmit={handleSubmit(handleSubmitSimulation)}
      className={styles.form}
    >
      <Input
        id="numChargePoints"
        name="numChargePoints"
        register={register}
        label="Number of Charge Points"
        errorMessage={errors['numChargePoints']?.message}
      />
      <Input
        id="arrivalMultiplier"
        name="arrivalMultiplier"
        register={register}
        label="Arrival Multiplier (%)"
        errorMessage={errors['arrivalMultiplier']?.message}
      />
      <Input
        id="consumption"
        name="consumption"
        register={register}
        label="Consumption (kWh/100km)"
        errorMessage={errors['consumption']?.message}
      />
      <Input
        id="chargingPower"
        name="chargingPower"
        register={register}
        label="Charging Power (kW)"
        errorMessage={errors['chargingPower']?.message}
      />

      <Button type="submit" fullWidth padding="1rem">
        {mutation.isPending ? 'Running simulation...' : 'Run Simulation'}
      </Button>
    </form>
  );
};

export default Simulation;
