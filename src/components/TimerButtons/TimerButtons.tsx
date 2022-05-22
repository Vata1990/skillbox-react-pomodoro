import React, { FC, MouseEvent } from 'react';
import { useAppDispatch } from '../../hooks/redux-hooks';
import {
  done,
  pass,
  pause,
  start,
  stop,
  TimerStatus,
} from '../../store/timerSlice';
import styles from './timerButtons.module.css';

type IProps = {
  stage: string;
  status: string;
};

const TimerButtons: FC<IProps> = ({ stage, status }) => {
  // const { stage, status } = useAppSelector((state) => state.timer);
  let buttons: React.ReactNode;

  switch (stage) {
    case 'idle':
      buttons = (
        <>
          <StartButton />
          <StopButton />
        </>
      );
      break;

    case 'work':
      if (status === TimerStatus.STOPPED) {
        buttons = (
          <>
            <StartButton />
            <StopButton />
          </>
        );
      } else if (status === TimerStatus.STARTED) {
        buttons = (
          <>
            <PauseButton />
            <StopButton />
          </>
        );
      } else {
        buttons = (
          <>
            <ContinueButton />
            <DoneButton />
          </>
        );
      }
      break;

    case 'pause':
      if (status === TimerStatus.STARTED) {
        buttons = (
          <>
            <PauseButton />
            <PassButton />
          </>
        );
      } else {
        buttons = (
          <>
            <ContinueButton />
            <PassButton />
          </>
        );
      }
      break;

    default:
      break;
  }

  return <div className={styles.container}>{buttons}</div>;
};

const DoneButton: FC = () => {
  const dispatch = useAppDispatch();
  function handleClick(event: MouseEvent<HTMLButtonElement>): void {
    dispatch(done());
  }

  return (
    <button className={styles.outline} onClick={handleClick}>
      Сделано
    </button>
  );
};

const ContinueButton: FC = () => {
  const dispatch = useAppDispatch();
  function handleClick(event: MouseEvent<HTMLButtonElement>): void {
    dispatch(start());
  }

  return (
    <button className={styles.inline} onClick={handleClick}>
      Продолжить
    </button>
  );
};

const PauseButton: FC = () => {
  const dispatch = useAppDispatch();
  function handleClick(event: MouseEvent<HTMLButtonElement>): void {
    dispatch(pause());
  }

  return (
    <button className={styles.inline} onClick={handleClick}>
      Пауза
    </button>
  );
};

const PassButton: FC = () => {
  const dispatch = useAppDispatch();

  function handleClick(event: MouseEvent<HTMLButtonElement>): void {
    dispatch(pass());
  }

  return (
    <button className={styles.outline} onClick={handleClick}>
      Пропустить
    </button>
  );
};

const StopButton: FC = () => {
  const dispatch = useAppDispatch();
  function handleClick(event: MouseEvent<HTMLButtonElement>): void {
    dispatch(stop());
  }

  return (
    <button className={styles.outline} onClick={handleClick}>
      Стоп
    </button>
  );
};

const StartButton: FC = () => {
  const dispatch = useAppDispatch();

  function handleStart(event: MouseEvent<HTMLButtonElement>): void {
    dispatch(start());
  }
  return (
    <button className={styles.inline} onClick={handleStart}>
      Старт
    </button>
  );
};

export default TimerButtons;
