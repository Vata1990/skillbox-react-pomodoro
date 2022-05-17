import { addWorkTime, addPause, addTomatos, addStop } from './statisticSlice';
import { AppDispatch, AppThunk } from './store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { increaseDone } from './taskSlice';

export enum TimerStatus {
  STARTED = 'STARTED',
  PAUSED = 'PAUSED',
  STOPPED = 'STOPPED',
}

export type TimerStage = 'idle' | 'work' | 'pause';

export interface ITimerState {
  value: number;
  status: TimerStatus;
  stage: TimerStage;
}

export const defaultWorkTime: number = 80;
export const defaultPauseTime: number = 70;

const initialState: ITimerState = {
  value: defaultWorkTime,
  status: TimerStatus.STOPPED,
  stage: 'idle',
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,

  reducers: {
    setTimer: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    setStatus: (state, action: PayloadAction<TimerStatus>) => {
      state.status = action.payload;
    },

    setStage: (state, action: PayloadAction<TimerStage>) => {
      state.stage = action.payload;
    },
  },
});

export const { setTimer, setStatus, setStage } = timerSlice.actions;
export default timerSlice.reducer;

// export const tick = () => async (dispatch: AppDispatch) => {
//   dispatch(setTimer(5));
//   dispatch(setStatus(TimerStatus.STOPPED));
// };

export const start = (): AppThunk => (dispatch, getState) => {
  const stage = getState().timer.stage;
  if (stage === 'idle') {
    dispatch(setStage('work'));
  }
  dispatch(setStatus(TimerStatus.STARTED));
};

export const pause = () => (dispatch: AppDispatch) => {
  dispatch(setStatus(TimerStatus.PAUSED));
};

export const stop = () => (dispatch: AppDispatch) => {
  dispatch(setStatus(TimerStatus.STOPPED));
  dispatch(setTimer(defaultWorkTime));
  dispatch(setStage('idle'));
  // add to statistic
  dispatch(addStop());
};

export const pass = (): AppThunk => (dispatch, getState) => {
  const tasks = getState().task.tasks;
  dispatch(setStatus(TimerStatus.STOPPED));
  dispatch(increaseDone(tasks[0].id));
  dispatch(setStage('idle'));
  dispatch(setTimer(defaultWorkTime));
  // add to statistic
  dispatch(addTomatos());
};

export const done = () => (dispatch: AppDispatch) => {
  console.log('DONE');
  dispatch(setStatus(TimerStatus.STOPPED));
  dispatch(setStage('pause'));
  dispatch(setTimer(defaultPauseTime));
  dispatch(setStatus(TimerStatus.STARTED));
};

export const tick =
  (activeTaskId: string): AppThunk =>
  (dispatch, getState) => {
    const { value, stage } = getState().timer;

    // add to statistic
    if (stage === 'work') {
      dispatch(addWorkTime());
    } else {
      dispatch(addPause());
    }

    const newValue = value - 1;
    if (newValue) {
      dispatch(setTimer(newValue));
    } else {
      dispatch(setStatus(TimerStatus.STOPPED));
      if (stage === 'work') {
        dispatch(setTimer(defaultPauseTime));
        dispatch(setStage('pause'));
        dispatch(setStatus(TimerStatus.STARTED));
      } else {
        dispatch(increaseDone(activeTaskId));
        dispatch(setTimer(defaultWorkTime));
        dispatch(setStage('idle'));
        // add to statistic
        dispatch(addTomatos());
      }
    }
  };
