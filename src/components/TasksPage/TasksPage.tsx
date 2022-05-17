import React from 'react';
import { Col } from '../Col';
import { Instruction } from '../Instruction';
import { Row } from '../Row';
import { TaskForm } from '../TaskForm';
import { TaskList } from '../TaskList';
import { TimerBlock } from '../TimerBlock';

export const TasksPage: React.FC = () => {
  return (
    <Row>
      <Col>
        <Instruction />
        <TaskForm />
        <TaskList />
      </Col>
      <Col>
        <TimerBlock />
      </Col>
    </Row>
  );
};
