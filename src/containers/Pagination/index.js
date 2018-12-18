import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from 'data/actions/page';
import Paginations from './element';


function mapStateToProps(state) {
  return {
    page: state.page,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrent: (pageNumber) => dispatch(actions.setCurrent(pageNumber)),
  };
}


const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Paginations);