import { connect } from 'react-redux';
import { actions } from 'data/actions/sort';
import SortingButton from 'components/SortingButton';


function mapStateToProps(state) {
  return {
    ...state.sort,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSort: (by, direction) => dispatch(actions.set({ by, direction })),
  };
}

// sorting order null -> 'asc' -> 'desc'
function mergeProps(stateProps, dispatchProps, ownProps) {
  const { sortKey } = ownProps;
  const { by, direction } = stateProps;
  const isActive = sortKey === by;

  const [nextBy, nextDirection] = getNextState();

  return {
    isActive,
    direction: isActive ? direction : '',
    onSort: () => dispatchProps.onSort(nextBy, nextDirection),
  };

  function getNextState() {
    if (isActive && direction === 'asc') return [sortKey, 'desc'];
    if (isActive && direction === 'desc') return [null, null];
    return [sortKey, 'asc'];
  }
}


const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);
export default connector(SortingButton);