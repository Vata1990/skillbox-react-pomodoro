import React, { FC, useState } from 'react';
import { ReactComponent as ConfigurationIcon } from '../icons/configuration.svg';
import styles from './sideMenu.module.css';

type IProps = {};

const SideMenu: FC<IProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <ConfigurationIcon onClick={() => setIsOpen(!isOpen)} />
      <div className={isOpen ? styles.open : styles.close}></div>
    </div>
  );
};

export default SideMenu;
