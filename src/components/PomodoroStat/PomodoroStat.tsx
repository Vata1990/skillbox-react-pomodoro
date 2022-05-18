import React, { FC } from 'react';
import styles from './pomodoroStat.module.css';
import { ReactComponent as PomodoroIcon } from '../../icons/tomato.svg';
import { ReactComponent as BigPomodoroIcon } from '../../icons/tomato 2.svg';
import { IWeekStatistic } from '../../models/statistic';

type IProps = {
  weekStatistic: IWeekStatistic;
};

const PomodoroStat: FC<IProps> = ({ weekStatistic }) => {
  return (
    <div className={styles.container}>
      {weekStatistic.dayStatistic ? (
        <>
          <div className={styles.tomatoBlock}>
            <PomodoroIcon className={styles.tomato} />
            <span className={styles.description}>
              {' '}
              * {weekStatistic.dayStatistic?.tomatos}
            </span>
          </div>
          <h3 className={styles.count}>
            {weekStatistic.dayStatistic?.tomatos} помидора
          </h3>
        </>
      ) : (
        <div className={styles.tomatoBlock}>
          <BigPomodoroIcon />
        </div>
      )}
    </div>
  );
};

export default PomodoroStat;
