import React, { FC } from 'react';
import styles from './statisticHeader.module.css';

type IProps = { setWeekNumber: (number: number) => void };

const StatisticHeader: FC<IProps> = ({ setWeekNumber }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Ваша активность</h2>
      <div className={styles.selectContainer}>
        <select
          className={styles.select}
          onChange={(event) => setWeekNumber(Number(event.target.value))}
        >
          <option value={0}>Эта неделя</option>
          <option value={1}>1 неделя назад</option>
          <option value={2}>2 недели назад</option>
          <option value={3}>3 недели назад</option>
          <option value={4}>4 недели назад</option>
        </select>
      </div>
    </div>
  );
};

export default StatisticHeader;
