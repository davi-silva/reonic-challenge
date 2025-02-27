'use client';

import { Button, Input } from '@/components';
import React, { FC } from 'react';

import styles from './index.module.scss';
import { useSimulation } from '@/hooks';

const Simulation = () => {
  const { errors, handleSubmit, handleSubmitSimulation, register } =
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
        type="number"
      />
      <Input
        id="arrivalMultiplier"
        name="arrivalMultiplier"
        register={register}
        label="Arrival Multiplier (%)"
        type="number"
      />
      <Input
        id="consumption"
        name="consumption"
        register={register}
        label="Consumption (kWh/100km)"
        type="number"
      />
      <Input
        id="chargingPower"
        name="chargingPower"
        register={register}
        label="Charging Power (kW)"
        type="number"
      />

      <Button type="submit" fullWidth padding="1rem">
        Run Simulation
      </Button>
    </form>
  );
};

export default Simulation;
