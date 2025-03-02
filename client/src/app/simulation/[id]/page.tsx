import { ConcurrencyFactor, DailyPowerDemand, Table } from '@/components';
import { getSimulation, runSimulation } from '@/services/simulation';

import React from 'react';
import styles from './index.module.scss';

const SimulationPage = async ({ params }: any) => {
  const id = (await params).id;

  const simulated = await runSimulation(id);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Simulation #{id}</h1>
      <div className={styles.modal}>
        <Table results={simulated} />
        <div className={styles.row}>
          <div className={styles.rowCell}>
            <ConcurrencyFactor results={simulated} height={300} width={400} />
          </div>
          <div className={styles.rowCell}>
            <DailyPowerDemand results={simulated} height={300} width={400} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationPage;
