import Link from 'next/link';
import React from 'react';
import styles from './index.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer} data-testid="footer">
      <div className={styles.container}>
        <Link href="/" className={styles.brand}>
          <h4>Reonic Challenge</h4>
        </Link>
        <p className={styles.developedBy}>
          Developed by{' '}
          <Link href="https://www.github.com/davi-silva" target="_blank">
            <strong>Davi Silva</strong>
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
