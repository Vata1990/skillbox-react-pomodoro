import React, { FC } from 'react';
import styles from './col.module.css';

type IProps = {
  children?: React.ReactNode;
  flexBasis?: string;
  flexGrow?: number;
  marginRight?: string;
};

export const Col: FC<IProps> = ({
  children,
  flexBasis,
  flexGrow,
  marginRight,
}) => {
  return (
    <div
      className={styles.col}
      style={{ flexBasis: flexBasis, flexGrow, marginRight }}
    >
      {children}
    </div>
  );
};
