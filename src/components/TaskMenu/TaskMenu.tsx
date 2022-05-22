import React, { EventHandler, FC, MouseEvent, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './taskMenu.module.css';
import { ReactComponent as MenuIcon } from '../../icons/menu.svg';

import { MenuList } from '../MenuList';
import { Modal } from '../Modal';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { deleteTask } from '../../store/taskSlice';

type IProps = {
  taskId: string;
};

const TaskMenu: FC<IProps> = ({ taskId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleClick: EventHandler<MouseEvent<HTMLButtonElement>> = (event) => {
    const top =
      event.currentTarget.getBoundingClientRect().bottom + window.scrollY;
    const left =
      event.currentTarget.getBoundingClientRect().right -
      event.currentTarget.getBoundingClientRect().width / 2;
    setMenuPosition({ top, left });
    setIsOpen(!isOpen);
  };

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={handleClick} className={styles.button}>
        <MenuIcon />
      </button>
      <Modal showModal={showModal} onModalClose={() => setShowModal(false)}>
        <div className={styles.confirmation}>
          <h3 className={styles.header}>Удалить задачу?</h3>
          <button
            className={styles.delete}
            onClick={() => {
              dispatch(deleteTask(taskId));
              setShowModal(false);
            }}
          >
            Удалить
          </button>
          <button className={styles.cancel} onClick={() => setShowModal(false)}>
            Отмена
          </button>
        </div>
      </Modal>
      {isOpen &&
        createPortal(
          <MenuList
            menuPosition={menuPosition}
            taskId={taskId}
            handleClose={handleClose}
            setShowModal={setShowModal}
          />,
          document.getElementById('combobox') as HTMLElement
        )}
    </div>
  );
};

export default TaskMenu;
