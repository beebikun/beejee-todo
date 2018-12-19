import { connect } from 'react-redux';
import { actions } from 'data/actions/task';
import TaskRow from 'components/TaskRow';

function mapStateToProps(state) {
  return {
    isLogin: state.auth.isLogin,
    editTaskId: state.editTaskId,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onEdit: (taskId) => dispatch(actions.setEditItem(taskId)),
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { isLogin, editTaskId } = stateProps;
  const { task } = ownProps;
  const { onEdit } = dispatchProps;
  return {
    isLogin, task,
    isEdit: isLogin ? editTaskId === task.id : false,
    onEdit: isLogin ? () => onEdit(task.id) : null,
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);
export default connector(TaskRow);