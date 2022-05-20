import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { RoutesEnum } from '../../routes';
import { Layout } from '../Layout/Layout';
import styles from './header.module.css';
import { ReactComponent as LogoIcon } from '../../icons/tomato.svg';
import { ReactComponent as StatisticIcon } from '../../icons/stats.svg';
import { ThemeSwitcher } from '../ThemeSwitcher';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Layout className={styles.container}>
        <Link to={RoutesEnum.main} className={styles.logo}>
          <LogoIcon className={styles.icon} />
          <span className={styles.text}>pomodoro_box</span>
        </Link>
        <ThemeSwitcher />
        <Link to={RoutesEnum.statistic} className={styles.stats}>
          <StatisticIcon className={styles['stats-icon']} />
          Статистика
        </Link>
      </Layout>
    </header>
  );
};
