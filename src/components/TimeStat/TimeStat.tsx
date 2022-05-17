import React, { FC } from 'react';
import { IWeekStatistic } from '../../services/stat-service';
import styles from './timeStat.module.css';

type IProps = { weekStatistic: IWeekStatistic };

const TimeStat: FC<IProps> = ({ weekStatistic }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.header}>{weekStatistic.dayLabel}</h3>

      <span className={styles.text}>
        {weekStatistic.dayStatistic ? (
          <>
            Вы работали над задачами в течении{' '}
            <span className={styles.minutes}>
              {weekStatistic.dayStatistic.workTime} минуты
            </span>
          </>
        ) : (
          'Нет данных'
        )}
      </span>
    </div>
  );
};

export default TimeStat;
