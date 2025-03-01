import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import React, { FC } from 'react';

import { Props } from '../types';
import styles from '../index.module.scss';

const ConcurrencyFactor: FC<Props> = ({ results }) => {
  return (
    <div className={styles.chartContainer}>
      <h3>Concurrency Factor by Chargepoints</h3>
      <BarChart width={600} height={300} data={results.concurrencyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="chargepoints" />
        <YAxis />
        <Tooltip
          formatter={(value: number) => `${(value * 100).toFixed(2)}%`}
        />
        <Bar dataKey="concurrency" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default ConcurrencyFactor;
