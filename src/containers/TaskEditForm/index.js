import { connect } from 'react-redux';
import { actions } from 'data/actions/task';
import TaskEditForm from 'components/TaskEditForm';


function mapDispatchToProps(dispatch) {
  return {
    onSave: (data) => dispatch(actions.editItem.request(data)),
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { task } = ownProps;
  const { onSave } = dispatchProps;
  return {
    task,
    onSave: (data) => onSave({ ...task, ...data }),
  };
}

const connector = connect(null, mapDispatchToProps, mergeProps);
export default connector(TaskEditForm);