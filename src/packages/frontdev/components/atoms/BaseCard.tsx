import React, { VFC } from 'react';
import styles from '../../assets/components/atoms/BaseCard.module.scss';

interface BASECARDPROPS {
  index: number,
  description: string,
  onClick?: (event: React.MouseEvent) => void,
  eventGuide?: string,
}

export const BaseCard: VFC<BASECARDPROPS> = ({
  index,
  description,
  onClick,
  eventGuide
}) => {
  return (
    <>
      <div className={styles.baseCard_container}>
        <div className={styles.baseCard_container__items}>
          <div className={styles.baseCard_container__items___index}>
            <p>Index : { `${ index + 1 }` }</p>
          </div>
          <div className={styles.baseCard_container__items___description}>
            <p>{ `${ description }` }</p>
          </div>
          <div className={ styles.baseCard_container__items___event }>
            <div onClick={ onClick }>{ eventGuide }</div>
          </div>
        </div>
      </div>
    </>
  );
}

