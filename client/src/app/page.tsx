'use client';

import './globals.css';

import { Form } from '@/layouts';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.simulator}>
        <h2 className={styles.heading}>EV Charging Simulator</h2>
        <Form />
      </div>
    </div>
  );
}
