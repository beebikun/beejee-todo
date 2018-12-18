import React from 'react';
import TasksList from 'containers/TaskList';
import Pagination from 'containers/Pagination';


const App = () => (
  <div>
    <TasksList id="TaskList" />
    <Pagination id="Pagination" />
  </div>
);

export default App;
