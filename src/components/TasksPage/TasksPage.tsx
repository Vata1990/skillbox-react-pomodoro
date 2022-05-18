import React from 'react';
import { Col } from '../Col';
import { Instruction } from '../Instruction';
import { Row } from '../Row';
import TaskFormContainer from '../TaskFormContainer/TaskFormContainer';
import { TaskList } from '../TaskList';
import { TimerBlock } from '../TimerBlock';

export const TasksPage: React.FC = () => {
  return (
    <Row>
      <Col>
        <Instruction />
        <TaskFormContainer />
        <TaskList />
      </Col>
      <Col>
        <TimerBlock />
      </Col>
    </Row>
  );
};
