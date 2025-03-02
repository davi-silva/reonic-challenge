'use client';

import { Button, Input } from '@/components';
import { FaMinus, FaPlus, FaRotateRight } from 'react-icons/fa6';
import React, { FC, Fragment } from 'react';
import { useApp, useSimulation } from '@/hooks';

import styles from './index.module.scss';

const Form = () => {
  const {
    errors,
    handleSubmit,
    handleSubmitSimulation,
    register,
    appendChargingPoint,
    removeChargingPoint,
    resetResults,
    mutationForm,
    fields,
    currentIndex,
    results,
    hasResults,
  } = useSimulation();
  const { toggleModal } = useApp();

  const styleMainButton = results ? styles.mainButtonsRow : '';

  return (
    <form
      onSubmit={handleSubmit(handleSubmitSimulation)}
      className={styles.form}
    >
      <Input
        id="arrivalMultiplier"
        name="arrivalMultiplier"
        register={register}
        label="Arrival Multiplier (%)"
        errorMessage={errors['arrivalMultiplier']?.message}
        disabled={hasResults}
        dataTestId="arrivalMultiplier"
      />
      <Input
        id="consumption"
        name="consumption"
        register={register}
        label="Consumption (kWh/100km)"
        errorMessage={errors['consumption']?.message}
        disabled={hasResults}
        dataTestId="consumption"
      />
      <div className={styles.inputsGrid}>
        {fields.map((_field, index) => {
          return (
            <Fragment key={index}>
              <Input
                id={`chargePoints.${index}.count`}
                name={`chargePoints.${index}.count`}
                register={register}
                label="Number of Charge Points"
                errorMessage={
                  errors.chargePoints
                    ? errors.chargePoints[index]?.count?.message
                    : undefined
                }
                disabled={hasResults}
                dataTestId={`chargePoints.${index}.count`}
              />

              <Input
                id={`chargePoints.${index}.power`}
                name={`chargePoints.${index}.power`}
                register={register}
                label="Charging Power (kW)"
                errorMessage={
                  errors.chargePoints
                    ? errors.chargePoints[index]?.power?.message
                    : undefined
                }
                disabled={hasResults}
                dataTestId={`chargePoints.${index}.power`}
              />
            </Fragment>
          );
        })}
      </div>

      <div className={styles.buttons}>
        <Button
          onClick={() => removeChargingPoint(currentIndex)}
          theme="secondary"
        >
          <FaMinus size={18} />
        </Button>
        <Button onClick={appendChargingPoint} theme="secondary">
          <FaPlus size={18} />
        </Button>
      </div>
      <div className={`${styles.mainButtons} ${styleMainButton}`}>
        {hasResults ? (
          <Button
            type="button"
            fullWidth
            padding="1rem"
            onClick={() => toggleModal('results')}
          >
            See results
          </Button>
        ) : (
          <Button
            type="submit"
            fullWidth
            padding="1rem"
            isDisabled={mutationForm.isPending}
            dataTestId="submitSimulation"
          >
            {mutationForm.isPending ? 'Simulating...' : 'Simulate'}
          </Button>
        )}
        {results && (
          <Button
            type="button"
            fullWidth
            padding="1rem"
            theme="secondary"
            onClick={resetResults}
          >
            <FaRotateRight size={20} />
          </Button>
        )}
      </div>
    </form>
  );
};

export default Form;
