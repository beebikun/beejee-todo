import { connect } from 'react-redux';
import { actions } from 'data/actions/auth';
import LoginForm from './element';


function mapStateToProps(state) {
  return {
    ...state.auth,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    onLogin: (data) => dispatch(actions.login.request(data)),
  };
}


const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(LoginForm);
