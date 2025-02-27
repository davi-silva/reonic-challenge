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
  align = 'center',
  size = 16,
  fullWidth = false,
  isDisabled = false,
  dataTestId,
  onClick,
}) => {
  const primary = theme === 'primary' ? styles.primary : null;
  const secondary = theme === 'secondary' ? styles.secondary : null;
  const alignment =
    align === 'center' ? 'center' : align === 'left' ? 'start' : 'end';

  return (
    <>
      {href ? (
        <Link
          href={isDisabled ? '#' : href}
          className={`${styles.button} ${primary} ${secondary}`}
          style={{
            padding,
            textAlign: alignment,
            fontSize: `${size}px`,
            ...(fullWidth ? { width: '100%' } : {}),
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
            textAlign: alignment,
            fontSize: `${size}px`,
            ...(fullWidth ? { width: '100%' } : {}),
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
