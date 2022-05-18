import React, { FC, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { fetchTasks, saveTasks } from '../../store/taskSlice';
import styles from './taskList.module.css';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  OnDragEndResponder,
} from 'react-beautiful-dnd';

import taskService from '../../services/task-service';
import { ITask } from '../../models/task';
import timerService from '../../services/timer-service';
import { defaultWorkTime } from '../../store/timerSlice';
import TaskItem from '../TaskItem/TaskItem';

type IProps = {};

const TaskList: FC<IProps> = () => {
  const { tasks } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  const activeTask = useMemo<ITask | null>(() => {
    return taskService.getActiveTask(tasks);
  }, [tasks]);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

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
                    <TaskItem
                      activeTask={activeTask}
                      provided={provided}
                      task={task}
                    />
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
