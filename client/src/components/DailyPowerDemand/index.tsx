'use client';

import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import React, { FC } from 'react';

import { Props } from './types';
import styles from './index.module.scss';

const DailyPowerDemand: FC<Props> = ({ results }) => {
  return (
    <div className={styles.chartContainer}>
      <h3>Exemplary Day Power Demand (kW)</h3>
      <div>
        <LineChart width={600} height={300} data={results.dayData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="power" stroke="#8884d8" dot={false} />
        </LineChart>
      </div>
    </div>
  );
};

export default DailyPowerDemand;
