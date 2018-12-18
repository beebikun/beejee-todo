import { connect } from 'react-redux';

import TodoList from './element';


function mapStateToProps(state) {
  return {
    todos: state.todos,
  };
}


const connector = connect(mapStateToProps);
export default connector(TodoList);