import React, {
  ChangeEvent,
  EventHandler,
  FC,
  FormEvent,
  useState,
} from 'react';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { addTask } from '../../store/taskSlice';
import TaskForm from '../TaskForm/TaskForm';

type IProps = {};

const TaskFormContainer: FC<IProps> = () => {
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
    <TaskForm
      title={title}
      error={error}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default TaskFormContainer;
