import React, { FC } from 'react';
import styles from './layout.module.scss';

type Props = {
  className?: string;
  children: React.ReactNode;
};

export const Layout: FC<Props> = ({ children, className }) => {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
};
