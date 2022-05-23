import React, { FC, useRef } from 'react';
import styles from './statisticDiagram.module.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { IWeekStatistic } from '../../models/statistic';

type IProps = {
  data: IWeekStatistic[];
  setActiveBar?: (index: number) => void;
};

const StatisticDiagram: FC<IProps> = ({ data, setActiveBar }) => {
  const ref = useRef<HTMLDivElement>(null);

  const clickHandler = (_: any, index: number): void => {
    setActiveBar && setActiveBar(index);
};
  return (
    <ResponsiveContainer
      className={styles.container}
    >
      <BarChart
        width={ref.current?.getBoundingClientRect().width}
        height={ref.current?.getBoundingClientRect().height}
        data={data}
      >
        <XAxis dataKey='dayShortLabel' stroke='#999999' axisLine={false} />
        <YAxis orientation='right' axisLine={false} />
        <Tooltip />
        <CartesianGrid stroke='#ccc' vertical={false} />
        <Bar
          dataKey='dayStatistic.workTime'
          fill='#EA8A79'
          onClick={clickHandler}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatisticDiagram;
