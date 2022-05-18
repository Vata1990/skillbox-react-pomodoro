import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStatistic } from '../models/statistic';
import statisticService from '../services/statistic-service';
import { AppThunk } from './store';
interface IStatisticState {
  stats: IStatistic[];
  currentStat: IStatistic;
}

const initialState: IStatisticState = {
  stats: [],
  currentStat: {} as IStatistic,
};

export const statisticSlice = createSlice({
  name: 'statistic',
  initialState,

  reducers: {
    setStatistic: (state, action: PayloadAction<IStatistic[]>) => {
      state.stats = action.payload;
    },

    setCurrentStatistic: (state, action: PayloadAction<IStatistic>) => {
      state.currentStat = action.payload;
    },
  },
});

export const { setStatistic, setCurrentStatistic } = statisticSlice.actions;

export default statisticSlice.reducer;

export const fetchStatistic = (): AppThunk => (dispatch, getState) => {
  const stats = statisticService.getStatistic();
  dispatch(setStatistic(stats));
};

export const fetchCurrentStatistic = (): AppThunk => (dispatch, getState) => {
  let stats = statisticService.getCurrentStatistic();
  if (!stats) {
    stats = statisticService.createStatistic();
  }
  dispatch(setCurrentStatistic(stats));
};

export const addWorkTime = (): AppThunk => (dispatch, getState) => {
  const { currentStat } = getState().statistic;
  const newStat: IStatistic = {
    ...currentStat,
    workTime: currentStat.workTime + 1,
  };
  dispatch(setCurrentStatistic(newStat));
  statisticService.updateStatistic(newStat);
};

export const addPause = (): AppThunk => (dispatch, getState) => {
  const { currentStat } = getState().statistic;
  const newStat: IStatistic = {
    ...currentStat,
    pauseTime: currentStat.pauseTime + 1,
  };
  dispatch(setCurrentStatistic(newStat));
  statisticService.updateStatistic(newStat);
};

export const addStop = (): AppThunk => (dispatch, getState) => {
  const { currentStat } = getState().statistic;
  const newStat: IStatistic = { ...currentStat, stops: currentStat.stops + 1 };
  dispatch(setCurrentStatistic(newStat));
  statisticService.updateStatistic(newStat);
};

export const addTomatos = (): AppThunk => (dispatch, getState) => {
  const { currentStat } = getState().statistic;
  const newStat: IStatistic = {
    ...currentStat,
    tomatos: currentStat.tomatos + 1,
  };
  dispatch(setCurrentStatistic(newStat));
  statisticService.updateStatistic(newStat);
};
