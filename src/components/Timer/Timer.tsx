import React, { FC, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { ITask } from '../../models/task';
import timerService from '../../services/timer-service';
import { fetchCurrentStatistic } from '../../store/statisticSlice';
import { tick, TimerStatus } from '../../store/timerSlice';
import styles from './timer.module.css';

type IProps = {
  status: TimerStatus;
  value: number;
  activeTask: ITask;
};

const Timer: FC<IProps> = ({ status, activeTask, value }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentStatistic());
  }, [dispatch]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === TimerStatus.STARTED && value > 0) {
      timer = setTimeout(() => {
        dispatch(tick(activeTask.id));
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [status, value, activeTask, dispatch]);

  const stringValue = timerService.convertTime(value);

  return (
    <>
      <div className={styles.value}>{stringValue}</div>
      <div className={styles.description}>
        Задача 1 -<span className={styles.task}> {activeTask.title}</span>
      </div>
    </>
  );
};

export default Timer;
