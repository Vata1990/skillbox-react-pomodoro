import React, { FC } from 'react';
import { ITask } from '../../models/task';
import { TimerStage } from '../../store/timerSlice';
import styles from './timerHeader.module.css';

type IProps = {
  activeTask: ITask | null;
  stage: TimerStage;
};

const TimerHeader: FC<IProps> = ({ activeTask, stage }) => {
  return (
    <div className={`${styles.header} ${styles[stage]}`}>
      {activeTask && (
        <>
          <h4 className={styles.task}>{activeTask.title}</h4>
          <span className={styles.complexity}>
            {stage === 'pause' ? 'Пауза' : 'Помидор'}{' '}
            {activeTask.finishedCount + 1}
          </span>{' '}
        </>
      )}
    </div>
  );
};

export default TimerHeader;
