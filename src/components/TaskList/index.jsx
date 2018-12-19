import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

import TaskRow from 'containers/TaskRow';
import SortingButton from 'containers/SortingButton';

const TaskList = ({ tasks, isLogin }) => (
  <table className="pure-table TaskList">
    <thead>
        <tr>
            <th>
              #
              <SortingButton sortKey="id" className="SortingButton" />
            </th>
            <th>
              Username
              <SortingButton sortKey="username" className="SortingButton" />
            </th>
            <th>
              Email
              <SortingButton sortKey="email" className="SortingButton" />
            </th>
            <th>Text</th>
            <th>
              Status
              <SortingButton sortKey="status" className="SortingButton" />
            </th>
            <th></th>
            { isLogin ? <th></th> : null }
        </tr>
    </thead>

    <tbody>
      { tasks.map((task, idx) => ( <TaskRow className="TaskRow" key={idx} task={ task } /> )) }
    </tbody>
  </table>
);

TaskList.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      status: PropTypes.number.isRequired,
      image_path: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired
}

export default TaskList;
