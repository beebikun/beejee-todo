import React from 'react';
import PropTypes from 'prop-types';

import Todo from 'components/Todo';

const TodoList = ({ todos }) => (
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
      { todos.map((todo, idx) => ( <Todo key={idx} { ...todo } /> )) }
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
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

export default TodoList;
