'use client';

import { FaChartBar, FaTrashAlt } from 'react-icons/fa';
import React, { FC } from 'react';

import Button from '@/components/Button';
import { SimulationsProps } from './types';
import styles from './index.module.scss';
import { useSimulation } from '@/hooks';

const Simulations: FC<SimulationsProps> = ({ simulations }) => {
  const { simulationDeletion } = useSimulation();

  return (
    <ul className={styles.list}>
      {simulations.length === 0 && (
        <div className={styles.noSimulations}>
          <p>No simulations yet</p>
          <Button href="/">Simulate EV Charges</Button>
        </div>
      )}
      {simulations.map((sim) => (
        <li key={sim.id} className={styles.item}>
          <div className={styles.header}>
            <div className={styles.headerStatus}>
              <h3 className={styles.heading}>Simulation #{sim.id}</h3>
              <span className={styles.status}>
                {sim.totalEnergy ? 'Completed' : 'Pending'}
              </span>
            </div>
            <div className={styles.buttons}>
              <Button href={`/simulation/${sim.id}`} title="Show Charts">
                <FaChartBar />
              </Button>
              <Button
                type="button"
                title="Delete Simulation"
                onClick={() => simulationDeletion(sim.id)}
              >
                <FaTrashAlt />
              </Button>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.data}>
              <strong>Chargepoints:</strong>
              <span>{sim.numChargePoints}</span>
            </div>
            <div className={styles.data}>
              <strong>Arrival Multiplier:</strong>
              <span>{sim.arrivalMultiplier}%</span>
            </div>
            <div className={styles.data}>
              <strong>Consumption:</strong>
              <span>{sim.consumption} kWh/100km</span>
            </div>
            <div className={styles.data}>
              <strong>Charging Power:</strong>
              <span>{sim.chargingPower.toFixed(2)} kW</span>
            </div>
            <div className={styles.data}>
              <strong>Total Energy:</strong>
              <span>
                {sim.totalEnergy ? sim.totalEnergy.toFixed(2) : '-'} kWh
              </span>
            </div>
            <div className={styles.data}>
              <strong>Max Power:</strong>
              <span>{sim.maxPower ? sim.maxPower.toFixed(2) : '-'} kW</span>
            </div>
            <div className={styles.data}>
              <strong>Theoretical Max:</strong>
              <span>
                {sim.theoreticalMaxPower
                  ? sim.theoreticalMaxPower.toFixed(2)
                  : '-'}{' '}
                kW
              </span>
            </div>
            <div className={styles.data}>
              <strong>Concurrency:</strong>
              <span>
                {sim.concurrencyFactor
                  ? (sim.concurrencyFactor * 100).toFixed(2)
                  : '-'}
                %
              </span>
            </div>
            <div className={styles.data}>
              <strong>Events:</strong>
              <span>{sim.chargingEvents || '-'}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Simulations;
