'use client';

import './globals.css';

import { ResultsDisplay, Simulation } from '@/layouts';

import styles from './page.module.scss';
import { useSimulation } from '@/hooks';

export default function Home() {
  const { mutationSimulation } = useSimulation();

  return (
    <div className={styles.container}>
      <div className={styles.simulator}>
        <h1 className={styles.heading}>EV Charging Simulator</h1>
        <Simulation />
        {/* {loading && <p className="mt-4 text-gray-600">Running simulation...</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {results && <ResultsDisplay results={results} />} */}
      </div>
      <div className={styles.results}>
        {mutationSimulation.data && (
          <ResultsDisplay results={mutationSimulation.data} />
        )}
      </div>
    </div>
  );
}
