import { IStatistic, IWeekStatistic } from '../models/statistic';

class StatisticService {
  private key = 'statistic';

  getStatistic(): IStatistic[] {
    const data = localStorage.getItem(this.key);
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  }

  updateStatistic(currentStatistic: IStatistic): void {
    const currentDate = new Date().toLocaleDateString();
    let statistic = this.getStatistic();

    if (statistic.find((stat) => stat.date === currentDate)) {
      statistic = statistic.map((stat) =>
        stat.date === currentDate ? currentStatistic : stat
      );
    } else {
      statistic.push(currentStatistic);
    }
    console.log(statistic);

    localStorage.setItem(this.key, JSON.stringify(statistic));
  }

  getCurrentStatistic(): IStatistic | null {
    const currentDate = new Date().toLocaleDateString();
    const statistic = this.getStatistic();
    const currentStatistic = statistic.find(
      (stat) => stat.date === currentDate
    );
    return currentStatistic ?? null;
  }

  createStatistic(): IStatistic {
    const currentDate = new Date().toLocaleDateString();
    return {
      date: currentDate,
      pauseTime: 0,
      stops: 0,
      tomatos: 0,
      workTime: 0,
    };
  }

  prepareWeekStatistic(
    statistic: IStatistic[],
    weekNumber: number
  ): IWeekStatistic[] {
    const currentDate = new Date();
    const firstDay = new Date(
      currentDate.setDate(
        currentDate.getDate() - currentDate.getDay() + 1 - weekNumber * 7
      )
    );
    firstDay.setHours(0, 0, 0);
    const lastDay = new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 7)
    );
    lastDay.setHours(23, 59, 59);

    const weekStat = statistic.filter(
      (stat) =>
        new Date(stat.date) >= firstDay && new Date(stat.date) <= lastDay
    );

    return [
      {
        dayLabel: 'Понедельник',
        dayShortLabel: 'Пн',
        dayStatistic:
          weekStat.find((stat) => new Date(stat.date).getDay() === 1) ?? null,
      },
      {
        dayLabel: 'Вторник',
        dayShortLabel: 'Вт',
        dayStatistic:
          weekStat.find((stat) => new Date(stat.date).getDay() === 2) ?? null,
      },
      {
        dayLabel: 'Среда',
        dayShortLabel: 'Ср',
        dayStatistic:
          weekStat.find((stat) => new Date(stat.date).getDay() === 3) ?? null,
      },
      {
        dayLabel: 'Четверг',
        dayShortLabel: 'Чт',
        dayStatistic:
          weekStat.find((stat) => new Date(stat.date).getDay() === 4) ?? null,
      },
      {
        dayLabel: 'Пятница',
        dayShortLabel: 'Пт',
        dayStatistic:
          weekStat.find((stat) => new Date(stat.date).getDay() === 5) ?? null,
      },
      {
        dayLabel: 'Суббота',
        dayShortLabel: 'Сб',
        dayStatistic:
          weekStat.find((stat) => new Date(stat.date).getDay() === 6) ?? null,
      },
      {
        dayLabel: 'Воскресенье',
        dayShortLabel: 'Вс',
        dayStatistic:
          weekStat.find((stat) => new Date(stat.date).getDay() === 7) ?? null,
      },
    ];
  }
}

export default new StatisticService();
