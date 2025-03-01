import { ConcurrencyFactor, DailyPowerDemand, Table } from '@/components';
import { getSimulation, runSimulation } from '@/services/simulation';

import React from 'react';
import styles from './index.module.scss';

const SimulationPage = async ({ params }: any) => {
  const id = (await params).id;

  const simulation = await getSimulation(id);
  const simulated = await runSimulation(id);

  console.log({ simulation, simulated });

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Simulation #{id}</h1>
      <Table results={simulated} />
      <div className={styles.row}>
        <ConcurrencyFactor results={simulated} />
        <DailyPowerDemand results={simulated} />
      </div>
    </div>
  );
};

export default SimulationPage;
