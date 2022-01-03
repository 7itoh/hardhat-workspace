import React, { VFC } from 'react';
import styles from '../../assets/components/atoms/BaseInput.module.scss';

interface BASEINPUTPROPS {
  guide: string,
  label: string,
  value: string,
  placeholder: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const BaseInput: VFC<BASEINPUTPROPS> = ({ 
  guide,
  label,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <>
      <div className={styles.baseInput_container}>
        <div className={styles.baseInput_container__guide}>
          <p>{ guide }</p>
        </div>
        <div className={styles.baseInput_container__items}>
          <div className={styles.baseInput_container__items___input}>
            <input type="text" value={ value } placeholder={ placeholder } onChange={ onChange }/>
          </div>
          <div className={styles.baseInput_container__items___label}>
            <label>{ label }</label>
          </div>
        </div>
      </div>
    </>
  );
}