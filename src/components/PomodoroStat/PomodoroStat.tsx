import React, { FC } from 'react';
import styles from './pomodoroStat.module.css';
import { ReactComponent as Pomodoro } from '../../icons/tomato.svg';
import { ReactComponent as PomodoroEmpty } from '../../icons/tomato 2.svg';
import { IWeekStatistic } from '../../services/stat-service';

type IProps = {
  weekStatistic: IWeekStatistic;
};

const PomodoroStat: FC<IProps> = ({ weekStatistic }) => {
  return (
    <div className={styles.container}>
      {weekStatistic.dayStatistic ? (
        <>
          <div className={styles.tomatoBlock}>
            <Pomodoro className={styles.tomato} />
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
          <PomodoroEmpty />
        </div>
      )}
    </div>
  );
};

export default PomodoroStat;
