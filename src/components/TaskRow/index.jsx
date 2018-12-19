import React from 'react';
import PropTypes from 'prop-types';

import Task from 'components/Task';
import TaskEditForm from 'containers/TaskEditForm';


const TaskRow = ({ task, isLogin, isEdit, onEdit }) => {
  if (isEdit) return (<TaskEditForm task={ task } />);
  const editButton = <button className="pure-button"
                             onClick={ onEdit }
                            >
                      Edit
                    </button>;
  return (<Task task={ task } buttonElement={ isLogin ? editButton : null } />);
};

TaskRow.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    image_path: PropTypes.string.isRequired,
  }),
  isLogin: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool,
  onEdit: PropTypes.func,
}

export default TaskRow;
