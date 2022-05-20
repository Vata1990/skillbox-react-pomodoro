import React, { FC, useMemo } from 'react';
import { TimerButtons } from '../TimerButtons';
import { TimerHeader } from '../TimerHeader';
import styles from './timerBlock.module.scss';
import { Timer } from '../Timer';
import { useAppSelector } from '../../hooks/redux-hooks';
import taskService from '../../services/task-service';
import { CSSTransition } from 'react-transition-group';
import { ITask } from '../../models/task';

type IProps = {};

const TimerBlock: FC<IProps> = () => {
  const { tasks } = useAppSelector((state) => state.task);
  const { stage, status, value } = useAppSelector((state) => state.timer);

  const activeTask = useMemo(() => {
    return taskService.getActiveTask(tasks);
  }, [tasks]);

  return (
    <div>
      <TimerHeader activeTask={activeTask} stage={stage} />
      <div className={styles.body}>
        <CSSTransition
          in={!!activeTask}
          timeout={1000}
          classNames={{ ...styles }}
          unmountOnExit
        >
          <div>
            <Timer
              status={status}
              activeTask={activeTask || ({} as ITask)}
              value={value}
            />
            <TimerButtons stage={stage} status={status} />
          </div>
        </CSSTransition>
        {!activeTask && <h2>No tasks yet</h2>}
      </div>
    </div>
  );
};

export default TimerBlock;
