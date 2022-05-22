import React from 'react';
import { Col } from '../Col';
import { Instruction } from '../Instruction';
import { Row } from '../Row';
import TaskFormContainer from '../TaskFormContainer/TaskFormContainer';
import { TaskList } from '../TaskList';
import { TimerBlock } from '../TimerBlock';
import styles from './taskPage.module.css';

export const TasksPage: React.FC = () => {
  return (
    <Row className={styles.task}>
      <Col className={styles.left}>
        <Instruction />
        <TaskFormContainer />
        <TaskList />
      </Col>
      <Col className={styles.right}>
        <TimerBlock />
      </Col>
    </Row>
  );
};
