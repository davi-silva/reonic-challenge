'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useApp, useSimulation } from '@/hooks';

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
              <button className={styles.closeButton}>
                <FaPlus size={20} />
              </button>
            </header>

            <Table results={results} />

            <h3>Exemplary Day Power Demand</h3>
            <div>
              <LineChart width={600} height={300} data={results.dayData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis
                  label={{
                    value: 'Power (kW)',
                    angle: -90,
                    position: 'insideLeft',
                  }}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="power"
                  stroke="#8884d8"
                  dot={false}
                />
              </LineChart>
            </div>

            <h3>Concurrency Factor by Chargepoints</h3>
            <div>
              <BarChart width={600} height={300} data={results.concurrencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="chargepoints" />
                <YAxis
                  label={{
                    value: 'Concurrency Factor',
                    angle: -90,
                    position: 'insideLeft',
                  }}
                />
                <Tooltip
                  formatter={(value: number) => `${(value * 100).toFixed(2)}%`}
                />
                <Bar dataKey="concurrency" fill="#82ca9d" />
              </BarChart>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Results;
