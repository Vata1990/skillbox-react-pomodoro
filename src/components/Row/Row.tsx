import React, { FC } from 'react';
import styles from './row.module.css';

type IProps = {
  children?: React.ReactNode;
  marginBottom?: string;
  className?: string;
};

const Row: FC<IProps> = ({ children, marginBottom, className }) => {
  return (
    <div className={[styles.row, className].join(' ')} style={{ marginBottom }}>
      {children}
    </div>
  );
};

export default Row;
