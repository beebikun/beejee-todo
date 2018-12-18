import React from 'react';
import PropTypes from 'prop-types';

import Task from 'components/Task';
import SortingButton from 'containers/SortingButton';

const TaskList = ({ tasks }) => (
  <table className="pure-table">
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
