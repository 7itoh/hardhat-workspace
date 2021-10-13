import React from 'react';
import styles from '../../assets/components/atoms/Button.module.scss'
import { ButtonProps } from './types/Button.types'

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <>
      <div className={styles.button_sample_container}>
        <p>sample</p>
        <button>sample</button>
      </div>
      <button
        type="button"
        className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
        style={{ backgroundColor }}
        {...props}
      >
        {label}
      </button>
    </>
  );
};
