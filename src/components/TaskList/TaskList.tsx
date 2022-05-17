import React, {
  EventHandler,
  FC,
  FocusEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import {
  editTaskId,
  fetchTasks,
  saveTasks,
  updateTaskName,
} from '../../store/taskSlice';
import { TaskMenu } from '../TaskMenu';
import styles from './taskList.module.css';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  OnDragEndResponder,
} from 'react-beautiful-dnd';
import { ReactComponent as DragIcon } from '../../icons/drag.svg';
import classnames from 'classnames';
import taskService from '../../services/task-service';
import { ITask } from '../../models/task';
import timerService from '../../services/timer-service';
import { defaultWorkTime } from '../../store/timerSlice';

type IProps = {};

const TaskList: FC<IProps> = () => {
  const { tasks, edittedTaskId } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLInputElement>(null);

  const activeTask = useMemo<ITask | null>(() => {
    return taskService.getActiveTask(tasks);
  }, [tasks]);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (edittedTaskId && ref.current) {
      ref.current.focus();
    }
  }, [edittedTaskId]);

  const summaryTime = useMemo(() => {
    const summary = tasks.reduce((summary, current) => {
      return (
        summary +
        (current.pomodoroCount - current.finishedCount) * defaultWorkTime
      );
    }, 0);
    return timerService.convertTime(summary);
  }, [tasks]);

  if (!tasks.length) {
    return null;
  }

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

  const handleDrag: OnDragEndResponder = (result) => {
    if (result.destination) {
      const newTasks = [...tasks];
      const [reorderedItem] = newTasks.splice(result.source.index, 1);
      newTasks.splice(result.destination.index, 0, reorderedItem);
      //newTasks.sort((a: ITask, b: ITask) => a.order - b.order);
      dispatch(saveTasks(newTasks));
    }
  };

  return (
    <DragDropContext onDragEnd={handleDrag}>
      <Droppable droppableId='tasks'>
        {(provided: DroppableProvided) => (
          <div>
            <ul
              className={styles.list}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided: DraggableProvided) => (
                    <li
                      className={classnames(
                        styles.item,
                        { [styles.active]: task.id === activeTask?.id },
                        {
                          [styles.done]:
                            task.pomodoroCount <= task.finishedCount,
                        }
                      )}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <span
                        className={styles.drag}
                        {...provided.dragHandleProps}
                      >
                        <DragIcon />
                      </span>
                      <span className={styles.complexity}>
                        {task.pomodoroCount}
                      </span>
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
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <li className={styles.item}>{summaryTime} минут</li>
            </ul>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
