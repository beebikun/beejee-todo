import React from 'react';
import PropTypes from 'prop-types';

import Task from 'components/Task';

const TaskList = ({ tasks }) => (
  <table className="pure-table">
    <thead>
        <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Text</th>
            <th>Status</th>
            <th></th>
        </tr>
    </thead>

    <tbody>
      { tasks.map((task, idx) => ( <Task key={idx} { ...task } /> )) }
    </tbody>
  </table>
);

TaskList.propTypes = {
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
