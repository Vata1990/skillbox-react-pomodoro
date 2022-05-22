import React, { FC } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { ReactComponent as Cross } from '../..//icons/Cross.svg';
import { CSSTransition } from 'react-transition-group';

type IProps = {
  children: React.ReactNode;
  title?: string;
  showModal: boolean;
  onModalClose: () => void;
};

const Modal: FC<IProps> = ({
  showModal,
  children,
  title,
  onModalClose = () => {},
}) => {
  const modalRoot = document.getElementById('modal');
  if (!modalRoot) {
    return null;
  }

  const handleClose = (): void => {
    onModalClose();
  };

  return createPortal(
    <CSSTransition
      in={showModal}
      timeout={500}
      classNames={{ ...styles }}
      mountOnEnter
      unmountOnExit
    >
      <div className={styles.background}>
        <div className={styles.modal}>
          <div className={styles.header}>
            {title}
            <button className={styles.close} onClick={handleClose}>
              <Cross />
            </button>
          </div>
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </CSSTransition>,
    modalRoot
  );
};

export default Modal;
