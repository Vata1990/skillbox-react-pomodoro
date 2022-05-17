import taskSlice from './taskSlice';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import timerSlice from './timerSlice';
import statisticSlice from './statisticSlice';

export const store = configureStore({
  reducer: {
    timer: timerSlice,
    task: taskSlice,
    statistic: statisticSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
