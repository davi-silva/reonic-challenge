'use server';

import React from 'react';
import { Simulations } from '@/components';
import { getAllSimulations } from '@/services/simulation';
import styles from './index.module.scss';

const SimulationsPage = async () => {
  const simulations = await getAllSimulations();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Past Simulations</h1>
      <Simulations simulations={simulations} />
    </div>
  );
};

export default SimulationsPage;
