import { connect } from 'react-redux';
import { actions } from 'data/actions/task';
import TaskAdd from './element';


function mapDispatchToProps(dispatch) {
  return {
    onAdd: (task) => dispatch(actions.addItem.request(task)),
  };
}


const connector = connect(null, mapDispatchToProps);
export default connector(TaskAdd);