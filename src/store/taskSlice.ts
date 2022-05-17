import { ITask } from './../models/task';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import taskService from '../services/task-service';

export interface ITaskState {
  tasks: ITask[];
  edittedTaskId: string | null;
}

const initialState: ITaskState = {
  tasks: [],
  edittedTaskId: null,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,

  reducers: {
    fetchTasks: (state, action: PayloadAction<void>) => {
      state.tasks = taskService.getTasksFromLocaleStorage();
    },

    saveTasks: (state, action: PayloadAction<ITask[]>) => {
      state.tasks = action.payload;
      taskService.saveTasksToLocalStorage(state.tasks);
    },

    addTask: (state, action: PayloadAction<string>) => {
      state.tasks.push({
        id: String(Date.now()),
        title: action.payload,
        //order: state.tasks.length + 1,
        pomodoroCount: 1,
        finishedCount: 0,
      });
      taskService.saveTasksToLocalStorage(state.tasks);
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      taskService.saveTasksToLocalStorage(state.tasks);
    },

    increaseComplexity: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.map((task) =>
        task.id !== action.payload
          ? task
          : { ...task, pomodoroCount: ++task.pomodoroCount }
      );
      taskService.saveTasksToLocalStorage(state.tasks);
    },

    decreaseComplexity: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.map((task) =>
        task.id !== action.payload
          ? task
          : { ...task, pomodoroCount: --task.pomodoroCount }
      );
      taskService.saveTasksToLocalStorage(state.tasks);
    },

    increaseDone: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.map((task) =>
        task.id !== action.payload
          ? task
          : { ...task, finishedCount: ++task.finishedCount }
      );
      taskService.saveTasksToLocalStorage(state.tasks);
    },

    editTaskId: (state, action: PayloadAction<string | null>) => {
      state.edittedTaskId = action.payload;
    },

    updateTaskName: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.map((task) =>
        task.id === state.edittedTaskId
          ? { ...task, title: action.payload }
          : task
      );
      state.edittedTaskId = null;
      taskService.saveTasksToLocalStorage(state.tasks);
    },
  },
});

export const {
  addTask,
  saveTasks,
  deleteTask,
  increaseComplexity,
  increaseDone,
  decreaseComplexity,
  fetchTasks,
  editTaskId,
  updateTaskName,
} = taskSlice.actions;
export default taskSlice.reducer;
