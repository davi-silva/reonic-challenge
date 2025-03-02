'use client';

import { FC } from 'react';
import type { InputProps } from './types';
import styles from './index.module.scss';
import { toCapitalize } from '@/utils';

const Input: FC<InputProps> = ({
  register,
  name,
  id,
  required,
  disabled,
  label,
  type,
  errorMessage,
  width,
  ...rest
}) => {
  const stylesDisabled = disabled ? styles.disabled : '';

  return (
    <div className={styles.inputContainer}>
      {id && id.length && label && (
        <div className={styles.labelLinkContainer}>
          <label htmlFor={id} className={styles.label}>
            {toCapitalize(label)}
          </label>
        </div>
      )}
      <input
        className={`${styles.input} ${stylesDisabled}`}
        {...register(name, {
          required: required,
          disabled: disabled,
        })}
        type={type}
        id={id}
        style={{
          width,
        }}
        {...rest}
      />
      {errorMessage && (
        <span className={styles.errorMessage}>{errorMessage.toString()}</span>
      )}
    </div>
  );
};

export default Input;
