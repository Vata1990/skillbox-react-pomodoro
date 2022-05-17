import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { StatisticPage } from './components/StatisticPage';
import { TasksPage } from './components/TasksPage';
import { RoutesEnum } from './routes';

function App() {
  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path={RoutesEnum.main} element={<TasksPage />} />
          <Route path={RoutesEnum.statistic} element={<StatisticPage />} />
          <Route path='*' element={<Navigate to={RoutesEnum.main} />} />
        </Routes>
      </Main>
    </>
  );
}

export default App;
