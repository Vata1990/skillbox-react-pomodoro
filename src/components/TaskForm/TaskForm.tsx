import React, {
  ChangeEvent,
  EventHandler,
  FC,
  FormEvent,
  useState,
} from 'react';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { addTask } from '../../store/taskSlice';
import styles from './taskForm.module.css';

type IProps = {};

const TaskForm: FC<IProps> = () => {
  const [title, setTitle] = useState<string>('');
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);

  const handleChange: EventHandler<ChangeEvent<HTMLInputElement>> = (event) => {
    setTitle(event.target.value);
  };

  const validate = (value: string) => {
    if (value.length >= 3) {
      return true;
    } else {
      return false;
    }
  };
  const handleSubmit: EventHandler<FormEvent<HTMLFormElement>> = (event) => {
    event.preventDefault();

    if (validate(title)) {
      dispatch(addTask(title));
      setTitle('');
      setError(null);
    } else {
      setError('Название должно состоять минимум из 3 букв!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.input}
        type='text'
        id='title'
        value={title}
        onChange={handleChange}
        placeholder='Название задачи'
      />
      <span className={styles.error}>{error}</span>
      <label className={styles.label} htmlFor='title'>
        Название задачи
      </label>
      <button className={styles.button} type='submit'>
        Добавить
      </button>
    </form>
  );
};

export default TaskForm;
