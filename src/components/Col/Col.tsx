import React, { FC } from 'react';
import styles from './col.module.css';

type IProps = {
  children?: React.ReactNode;
  flexBasis?: string;
  flexGrow?: number;
  marginRight?: string;
  className?: string;
};

export const Col: FC<IProps> = ({
  children,
  flexBasis,
  flexGrow,
  marginRight,
  className,
}) => {
  return (
    <div
      className={[styles.col, className ? className : ''].join(' ')}
      style={{ flexBasis, flexGrow, marginRight }}
    >
      {children}
    </div>
  );
};
