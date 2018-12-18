import { connect } from 'react-redux';

import TaskList from './element';


function mapStateToProps(state) {
  return {
    tasks: state.tasks,
  };
}


const connector = connect(mapStateToProps);
export default connector(TaskList);