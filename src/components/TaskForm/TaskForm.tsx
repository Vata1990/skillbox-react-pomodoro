import React, { ChangeEvent, FC, FormEvent } from 'react';

import styles from './taskForm.module.css';

type IProps = {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
  title: string;
};

const TaskForm: FC<IProps> = ({ error, title, handleChange, handleSubmit }) => {
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
