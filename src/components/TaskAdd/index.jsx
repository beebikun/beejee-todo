import React from 'react';
import PropTypes from 'prop-types';

import SubmitForm from 'components/SubmitForm';

const FIELDS = [
  { name: 'username', type: 'text' },
  { name: 'email', type: 'email' },
  { name: 'text', type: 'text' },
  { name: 'image', type: 'file' },
];

const TaskAdd = ({ onAdd }) => (
  <div>
    <h2> Add Task </h2>
    <SubmitForm fields={ FIELDS } onSubmit={ onAdd } formName="TaskAdd" />
  </div>
);


TaskAdd.propTypes = {
  onAdd: PropTypes.func.isRequired,
}

export default TaskAdd;
