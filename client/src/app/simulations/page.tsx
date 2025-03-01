'use client';

import React, { useEffect } from 'react';

import { Simulations } from '@/components';
import styles from './index.module.scss';
import { useSimulation } from '@/hooks';

const SimulationsPage = () => {
  const { mutationSimulations, simulations } = useSimulation();

  useEffect(() => {
    mutationSimulations.mutate();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Past Simulations</h1>
      {simulations && <Simulations simulations={simulations} />}
    </div>
  );
};

export default SimulationsPage;
