import type { ButtonProps } from './types';
import type { FC } from 'react';
import Link from 'next/link';
import styles from './index.module.scss';

const Button: FC<ButtonProps> = ({
  children,
  type = 'button',
  href,
  theme = 'primary',
  padding,
  size = 16,
  fullWidth = false,
  isDisabled = false,
  dataTestId,
  onClick,
}) => {
  const primary = theme === 'primary' ? styles.primary : '';
  const secondary = theme === 'secondary' ? styles.secondary : '';

  return (
    <>
      {href ? (
        <Link
          href={isDisabled ? '#' : href}
          className={`${styles.button} ${primary} ${secondary}`}
          style={{
            padding,
            fontSize: `${size}px`,
            ...(fullWidth && { width: '100%' }),
            ...(isDisabled && { cursor: 'default' }),
          }}
          data-testid={dataTestId}
        >
          {children}
        </Link>
      ) : (
        <button
          type={type}
          className={`${styles.button} ${primary} ${secondary}`}
          onClick={onClick}
          disabled={isDisabled}
          style={{
            padding,
            fontSize: `${size}px`,
            ...(fullWidth && { width: '100%' }),
            ...(isDisabled && { cursor: 'default' }),
          }}
          data-testid={dataTestId}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
