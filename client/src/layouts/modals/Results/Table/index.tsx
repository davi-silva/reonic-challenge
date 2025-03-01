import React, { FC } from 'react';

import { TableProps } from './types';

const Table: FC<TableProps> = ({ results }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Total Energy Charged</th>
          <th>Theoretical Max Power</th>
          <th>Actual Max Power</th>
          <th>Concurrency Factor</th>
          <th>Charging Events</th>
        </tr>
      </thead>
      <tbody>
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
