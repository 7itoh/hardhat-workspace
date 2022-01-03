import { VFC } from 'react';
import styles from '../../assets/components/atoms/BaseTextCard.module.scss';

interface BASETEXTCARDPROPS {
  title?: string,
  labelMain: string,
  labelSub?: string,
  labelValue?: string | number | [],
  isMedium: boolean,
  isPrimary: boolean,
}

export const BaseTextCard: VFC<BASETEXTCARDPROPS> = ({ 
  title,
  labelMain,
  labelSub,
  labelValue,
  isMedium,
  isPrimary
}) => {
  const cardSize = isMedium ? styles.baseTextCard_container__medium : styles.baseTextCard_container__small;
  const cardColor = isPrimary ? styles.baseTextCard_container__title___labels____primary : styles.baseTextCard_container__title___labels____secondary;
  return (
    <>
      <div className={[styles.baseTextCard_container, cardSize].join(' ')}>
        <div className={styles.baseTextCard_container__title}>
          <h4>{ title }</h4>
          <div className={[styles.baseTextCard_container__title___labels, cardColor].join(' ')}>
            <div className={styles.baseTextCard_container__title___labels____text}>
              <div>
                <p>{ labelMain }</p>
              </div>
              <div>
                <p>{ labelSub }</p>
              </div>
              <div className={styles.baseTextCard_container__title___labels____value}>
                <p>{ labelValue }</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}