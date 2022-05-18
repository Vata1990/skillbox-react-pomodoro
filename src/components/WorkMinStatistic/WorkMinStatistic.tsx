import React, { FC } from 'react';
import { IWeekStatistic } from '../../models/statistic';
import styles from './workMinStatistic.module.css';

type IProps = { weekStatistic: IWeekStatistic };

const WorkMinStatistic: FC<IProps> = ({ weekStatistic }) => {
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

export default WorkMinStatistic;
