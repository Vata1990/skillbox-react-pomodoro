import React, { FC } from 'react';
import styles from './row.module.css';

type IProps = {
  children?: React.ReactNode;
  marginBottom?: string;
};

const Row: FC<IProps> = ({ children, marginBottom }) => {
  return (
    <div className={styles.row} style={{ marginBottom }}>
      {children}
    </div>
  );
};

export default Row;
