import pomodoroIcon from '../img/tomato 2.png';

class PomodoroNotification {
  private notification: Notification | null = null;

  constructor() {
    Notification.requestPermission();
  }

  createNotification(
    title: string,
    body?: string,
    icon: string = pomodoroIcon
  ): void {
    this.closeNotification();

    this.notification = new Notification(title, { body, icon });
  }

  closeNotification(): void {
    this.notification && this.notification.close();
  }
}

export default new PomodoroNotification();
