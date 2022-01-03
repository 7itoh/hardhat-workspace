import React, { VFC } from 'react';
import styles from '../../assets/components/atoms/BaseButton.module.scss';

interface BASEBUTTONPROPS { 
  label: string,
  isType?: string,
  onClick: (event: React.MouseEvent) => void;
}

export const BaseButton: VFC<BASEBUTTONPROPS> = ({
  label,
  isType,
  onClick
}) => {
  const isPrimary = isType === 'primary' ? styles.baseButton_container__primary : styles.baseButton_container__secondary;
  return (
    <>
      <div className={[styles.baseButton_container, isPrimary].join(' ')}>
        <button onClick={ onClick }>{ label }</button>
      </div>
    </>
  );
}