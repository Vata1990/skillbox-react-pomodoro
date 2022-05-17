import React, { FC } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { ReactComponent as Cross } from '../..//icons/Cross.svg';

type IProps = {
  children: React.ReactNode;
  title?: string;
  onModalClose: () => void;
};

const Modal: FC<IProps> = ({ children, title, onModalClose }) => {
  const modalRoot = document.getElementById('modal');
  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <div className={styles.background}>
      <div className={styles.modal}>
        <div className={styles.header}>
          {title}
          <button className={styles.close} onClick={onModalClose}>
            <Cross />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
