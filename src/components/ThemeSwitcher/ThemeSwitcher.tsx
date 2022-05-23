import React, { FC } from 'react';
import { useTheme } from '../../hooks/useTheme';
import styles from './themeSwitcher.module.css';

type IProps = {
  className?: string;
};

const ThemeSwitcher: FC<IProps> = ({ className }) => {
  const [theme, setTheme] = useTheme();

  return (
    <div className={[styles.container, className ? className : ''].join(' ')}>
      <button
        className={styles.btn}
        onClick={() => setTheme('dark')}
        disabled={theme === 'dark'}
      >
        Dark
      </button>
      <button
        className={styles.btn}
        onClick={() => setTheme('light')}
        disabled={theme === 'light'}
      >
        Light
      </button>
    </div>
  );
};

export default ThemeSwitcher;
