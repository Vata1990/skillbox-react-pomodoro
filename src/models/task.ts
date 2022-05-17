export interface ITask {
  id: string;
  //order: number;
  title: string;
  pomodoroCount: number;
  finishedCount: number;
  lastTimerValue?: null | number;
}
