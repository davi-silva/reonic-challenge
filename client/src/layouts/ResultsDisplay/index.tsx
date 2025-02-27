import React, { FC } from 'react';

import type { ResultsDisplayProps } from './types';

const ResultsDisplay: FC<ResultsDisplayProps> = ({ results }) => {
  return (
    <div>
      <h2>Simulation Results</h2>
      <p>
        <strong>Total Energy Consumed:</strong> {results.totalEnergy.toFixed(2)}{' '}
        kWh
      </p>
      <p>
        <strong>Peak Power Demand:</strong> {results.peakPower.toFixed(2)} kW
      </p>
      <p>
        <strong>Concurrency Factor:</strong>{' '}
        {(results.concurrency * 100).toFixed(2)}%
      </p>
    </div>
  );
};

export default ResultsDisplay;
