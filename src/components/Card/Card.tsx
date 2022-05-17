import classNames from 'classnames';
import React, { FC } from 'react';
import styles from './card.module.css';

type IProps = {
  title?: string;
  value: string;
  icon: React.ReactNode;
  color?: 'yellow' | 'purple' | 'blue' | 'grey';
};

const Card: FC<IProps> = ({ value, title, icon, color = 'grey' }) => {
  return (
    <div className={classNames(styles.container, styles[color])}>
      <div className={styles.content}>
        <h4 className={styles.title}>{title}</h4>
        <span className={styles.value}>{value}</span>
      </div>
      <div className={styles.icon}>{icon}</div>
    </div>
  );
};

export default Card;
