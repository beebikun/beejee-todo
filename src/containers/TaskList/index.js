import { connect } from 'react-redux';

import TaskList from 'components/TaskList';


function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    isLogin: state.auth.isLogin,
  };
}


const connector = connect(mapStateToProps);
export default connector(TaskList);