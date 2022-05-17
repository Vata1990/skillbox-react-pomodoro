class TimerService {
  convertTime(timeInMinutes: number): string {
    let hours: string | number = Math.floor(timeInMinutes / 3600);
    let minutes: string | number = Math.floor((timeInMinutes % 3600) / 60);
    let seconds: string | number = Math.floor((timeInMinutes % 3600) % 60);

    if (hours && hours < 10) {
      hours = '0' + hours;
    }
    if (minutes && minutes < 10) {
      minutes = '0' + minutes;
    }
    if (minutes && seconds < 10) {
      seconds = '0' + seconds;
    }
    if (hours) {
      return hours + ':' + minutes + ':' + seconds; // Return is HH : MM : SS
    } else if (minutes) {
      return minutes + ':' + seconds; // Return is MM : SS
    } else {
      return String(seconds);
    }
  }
}

export default new TimerService();
