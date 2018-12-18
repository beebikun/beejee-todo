import React from 'react';
import TasksList from 'containers/TaskList';
import Pagination from 'containers/Pagination';
import TaskAdd from 'containers/TaskAdd';


const App = () => (
  <div>
    <TasksList id="TaskList" />
    <Pagination id="Pagination" />
    <TaskAdd id="TaskAdd" />
  </div>
);

export default App;
