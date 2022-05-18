import React, {
  EventHandler,
  FC,
  FocusEvent,
  KeyboardEvent,
  useEffect,
  useRef,
} from 'react';
import classnames from 'classnames';
import styles from './taskItem.module.css';
import { ReactComponent as DragIcon } from '../../icons/drag.svg';
import { ITask } from '../../models/task';
import { DraggableProvided } from 'react-beautiful-dnd';
import { TaskMenu } from '../TaskMenu';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { editTaskId, updateTaskName } from '../../store/taskSlice';

type IProps = {
  task: ITask;
  activeTask: ITask | null;
  provided: DraggableProvided;
};

const TaskItem: FC<IProps> = ({ activeTask, provided, task }) => {
  const ref = useRef<HTMLInputElement>(null);
  const { edittedTaskId } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (edittedTaskId && ref.current) {
      ref.current.focus();
    }
  }, [edittedTaskId]);

  const handlePress: EventHandler<KeyboardEvent<HTMLInputElement>> = (
    event
  ) => {
    switch (event.key) {
      case 'Enter':
        dispatch(updateTaskName(event.currentTarget.value));
        break;

      case 'Escape':
        dispatch(editTaskId(null));
        break;

      default:
        break;
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>): void => {
    dispatch(updateTaskName(event.target.value));
  };

  const listStyles = classnames(
    styles.item,
    { [styles.active]: task.id === activeTask?.id },
    {
      [styles.done]: task.pomodoroCount <= task.finishedCount,
    }
  );

  return (
    <li
      className={listStyles}
      ref={provided.innerRef}
      {...provided.draggableProps}
    >
      <span className={styles.drag} {...provided.dragHandleProps}>
        <DragIcon />
      </span>
      <span className={styles.complexity}>{task.pomodoroCount}</span>
      {edittedTaskId === task.id ? (
        <input
          className={styles.input}
          defaultValue={task.title}
          onKeyDown={handlePress}
          onBlur={handleBlur}
          ref={ref}
        />
      ) : (
        <span className={styles.task}>{task.title}</span>
      )}
      <TaskMenu taskId={task.id} />
    </li>
  );
};

export default TaskItem;
