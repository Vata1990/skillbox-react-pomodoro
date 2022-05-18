import React, { useEffect, useState } from 'react';
import { Card } from '../Card';
import { Col } from '../Col';
import { PomodoroStat } from '../PomodoroStat';
import { Row } from '../Row';
import { ReactComponent as FocusIcon } from '../../icons/focus-stat.svg';
import { ReactComponent as PauseIcon } from '../../icons/pause-stat.svg';
import { ReactComponent as StopIcon } from '../../icons/stop-stat.svg';
import { StatisticHeader } from '../StatisticHeader';
import { StatisticDiagram } from '../StatisticDiagram';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { fetchStatistic } from '../../store/statisticSlice';
import statisticService from '../../services/statistic-service';
import { WorkMinStatistic } from '../WorkMinStatistic';

export const StatisticPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { stats } = useAppSelector((state) => state.statistic);
  const [activeStatisticIndex, setActiveStatisticIndex] = useState<number>(
    new Date().getDay()
  );
  const [weekNumber, setWeekNumber] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchStatistic());
  }, [dispatch]);

  const weekStatistic = statisticService.prepareWeekStatistic(
    stats,
    weekNumber
  );

  const activeStatistic = weekStatistic[activeStatisticIndex];

  return (
    <div>
      <Row marginBottom='32px'>
        <StatisticHeader setWeekNumber={setWeekNumber} />
      </Row>
      <Row marginBottom='32px'>
        <Col flexGrow={0} marginRight='32px'>
          <WorkMinStatistic weekStatistic={activeStatistic} />
          <PomodoroStat weekStatistic={activeStatistic} />
        </Col>
        <Col>
          <StatisticDiagram
            data={weekStatistic}
            setActiveBar={setActiveStatisticIndex}
          />
        </Col>
      </Row>
      <Row>
        <Col marginRight='32px'>
          <Card
            title='Фокус'
            value={`${
              activeStatistic.dayStatistic
                ? Math.floor(
                    (activeStatistic.dayStatistic.workTime * 100) /
                      (activeStatistic.dayStatistic.pauseTime +
                        activeStatistic.dayStatistic.workTime)
                  )
                : 0
            }%`}
            color={activeStatistic.dayStatistic ? 'yellow' : 'grey'}
            icon={<FocusIcon />}
          />
        </Col>
        <Col marginRight='32px'>
          <Card
            title='Время на паузе'
            value={`${activeStatistic.dayStatistic?.pauseTime ?? 0}м`}
            color={activeStatistic.dayStatistic ? 'purple' : 'grey'}
            icon={<PauseIcon />}
          />
        </Col>
        <Col>
          <Card
            title='Остановки'
            value={`${activeStatistic.dayStatistic?.stops ?? 0}`}
            color={activeStatistic.dayStatistic ? 'blue' : 'grey'}
            icon={<StopIcon />}
          />
        </Col>
      </Row>
    </div>
  );
};
