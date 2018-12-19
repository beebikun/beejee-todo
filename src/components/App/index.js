import React from 'react';
import TasksList from 'containers/TaskList';
import Pagination from 'containers/Pagination';
import TaskAdd from 'containers/TaskAdd';
import LoginForm from 'containers/LoginForm';

import './index.scss';

const App = () => (
  <div>
    <TasksList id="TaskList" />
    <Pagination id="Pagination" />

    <div className="Footer">
      <div className="pure-u-1-5" />

      <div className="pure-u-2-5">
        <TaskAdd id="TaskAdd" />
      </div>

      <div className="pure-u-2-5">
        <LoginForm id="LoginForm" />
      </div>
    </div>
  </div>
);

export default App;
