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

import { DailyPowerDemandProps } from './types';
import styles from './index.module.scss';

const DailyPowerDemand: FC<DailyPowerDemandProps> = ({
  results,
  width = 600,
  height = 300,
}) => {
  return (
    <div className={styles.chartContainer}>
      <h3>Exemplary Day Power Demand (kW)</h3>
      <div>
        <LineChart width={width} height={height} data={results.dayData}>
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
