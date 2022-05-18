export interface IStatistic {
  date: string;
  workTime: number;
  pauseTime: number;
  stops: number;
  tomatos: number;
}

export interface IWeekStatistic {
  dayLabel: string;
  dayShortLabel: string;
  dayStatistic: IStatistic | null;
}
