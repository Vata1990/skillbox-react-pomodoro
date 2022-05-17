import React, { FC, useEffect, useRef } from 'react';
import styles from './menuList.module.css';
import {
  decreaseComplexity,
  editTaskId,
  increaseComplexity,
} from '../../store/taskSlice';
import { ReactComponent as PlusIcon } from '../../icons/plus.svg';
import { ReactComponent as MinusIcon } from '../../icons/minus.svg';
import { ReactComponent as EditIcon } from '../../icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../icons/delete.svg';
import { useAppDispatch } from '../../hooks/redux-hooks';

type IProps = {
  menuPosition: {
    top: number;
    left: number;
  };
  taskId: string;
  handleClose: () => void;
  setShowModal: (value: boolean) => void;
};

const MenuList: FC<IProps> = ({
  menuPosition,
  taskId,
  handleClose,
  setShowModal,
}) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: any): void {
      if (ref.current) {
        if (!ref.current.contains(event.target)) {
          handleClose();
          console.log('close');
        }
      }
    }

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [handleClose]);

  return (
    <div
      className={styles.listContainer}
      style={{
        top: `${menuPosition.top}px`,
        left: `${menuPosition.left}px`,
      }}
      ref={ref}
    >
      <ul className={styles.list}>
        <li
          className={styles.item}
          onClick={() => {
            dispatch(increaseComplexity(taskId));
            handleClose();
          }}
        >
          <PlusIcon className={styles.icon} />
          Увеличить
        </li>
        <li
          className={styles.item}
          onClick={() => {
            dispatch(decreaseComplexity(taskId));
            handleClose();
          }}
        >
          <MinusIcon className={styles.icon} />
          Уменьшить
        </li>
        <li
          className={styles.item}
          onClick={() => {
            dispatch(editTaskId(taskId));
            handleClose();
          }}
        >
          <EditIcon className={styles.icon} />
          Редактировать
        </li>
        <li
          className={styles.item}
          onClick={() => {
            setShowModal(true);
            //dispatch(deleteTask(taskId));
            handleClose();
          }}
        >
          <DeleteIcon className={styles.icon} />
          Удалить
        </li>
      </ul>
    </div>
  );
};

export default MenuList;
