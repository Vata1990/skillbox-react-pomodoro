import React, { FC, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { ITask } from '../../models/task';
import timerService from '../../services/timer-service';
import { fetchCurrentStatistic } from '../../store/statisticSlice';
import { tick, TimerStatus } from '../../store/timerSlice';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
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
      <SwitchTransition mode='out-in'>
        <CSSTransition
          key={stringValue}
          timeout={500}
          classNames={{
            enter: styles.enter,
            exit: styles.exit,
          }}
        >
          <div className={styles.container}>
            <div className={styles.value}>{stringValue}</div>
          </div>
        </CSSTransition>
      </SwitchTransition>
      <div className={styles.description}>
        Задача 1 -<span className={styles.task}> {activeTask.title}</span>
      </div>
    </>
  );
};

export default Timer;
