import { ITask } from './../models/task';

class TaskService {
  private key = 'tasks';

  getTasksFromLocaleStorage(): ITask[] {
    let data = localStorage.getItem(this.key);
    if (!data) {
      data = '[]';
    }
    const tasks = JSON.parse(data);
    return tasks;
  }

  saveTasksToLocalStorage(tasks: ITask[]): void {
    const data = JSON.stringify(tasks);
    localStorage.setItem(this.key, data);
  }

  getActiveTask(tasks: ITask[]): ITask | null {
    for (let task of tasks) {
      if (task.finishedCount < task.pomodoroCount) {
        return task;
      }
    }
    return null;
  }
}

export default new TaskService();
