import { Button } from '@/components';
import { CHALLENGE_URL } from '@/constants';
import { FaGithub } from 'react-icons/fa6';
import Link from 'next/link';
import React from 'react';
import styles from './index.module.scss';

const NavigationBar = () => {
  return (
    <nav className={styles.nav} data-testd="navbar">
      <div className={styles.container}>
        <Link href="/" className={styles.brand}>
          <h1>Reonic Challenge</h1>
        </Link>

        <ul className={styles.menu}>
          <Button href="/simulations">Simulations</Button>
          <li className={styles.menuItem}>
            <Link href={CHALLENGE_URL} target="_blank">
              <FaGithub size={24} />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
