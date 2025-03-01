import React, { FC } from 'react';

import { Props } from '../types';
import styles from './index.module.scss';

const Table: FC<Props> = ({ results }) => {
  return (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        <tr>
          <th title="Total Energy Charged">TEC</th>
          <th title="Theoretical Max Power">TMP</th>
          <th title="Actual Max Power">AMP</th>
          <th title="Concurrency Factor">CP</th>
          <th title="Charging Events">CE</th>
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        <tr>
          <td>
            <span>{results.totalEnergy.toFixed(2)} kWh</span>
          </td>
          <td>
            <span>{results.theoreticalMaxPower} kW</span>
          </td>
          <td>
            <span>{results.maxPower.toFixed(2)} kW</span>
          </td>
          <td>
            <span>{(results.concurrencyFactor * 100).toFixed(2)}%</span>
          </td>
          <td>
            <span>{results.chargingEvents}</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
