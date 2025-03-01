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

import { HistoryProps } from './types';
import styles from './index.module.scss';

const History: FC<HistoryProps> = ({ data }) => {
  return (
    <div className={styles.container}>
      <LineChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <YAxis dataKey="totalEnergy" />
        <Line type="monotone" dataKey="totalEnergy" stroke="#000" />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
      </LineChart>
    </div>
  );
};

export default History;
