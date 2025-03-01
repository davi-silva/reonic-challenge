'use client';

import { useApp, useSimulation } from '@/hooks';

import ConcurrencyFactor from './ConcurrencyFactor';
import DailyPowerDemand from './DailyPowerDemand';
import { FaPlus } from 'react-icons/fa6';
import React from 'react';
import Table from './Table';
import styles from './index.module.scss';

const Results = () => {
  const { results } = useSimulation();
  const { toggleModal } = useApp();
  return (
    <>
      {results && (
        <>
          <div
            className={styles.background}
            onClick={() => toggleModal('results')}
          />
          <div className={styles.container}>
            <header className={styles.modalHeader}>
              <h1 className={styles.heading}>Simulation Results</h1>
              <button
                className={styles.closeButton}
                onClick={() => toggleModal('results')}
              >
                <FaPlus size={20} />
              </button>
            </header>
            <div className={styles.content}>
              <Table results={results} />
              <DailyPowerDemand results={results} />
              <ConcurrencyFactor results={results} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Results;
