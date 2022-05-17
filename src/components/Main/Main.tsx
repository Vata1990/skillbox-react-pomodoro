import React, { FC } from 'react';
import { Layout } from '../Layout';
import styles from './main.module.css';

type Props = {
  children?: React.ReactNode;
};

export const Main: FC<Props> = ({ children }) => {
  return (
    <main className={styles.main}>
      <Layout>{children}</Layout>
    </main>
  );
};
