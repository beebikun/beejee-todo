import React from 'react';
import PropTypes from 'prop-types';

import Task from 'components/Task';

const SortingButton = ({ onSort, isActive, direction }) => (
  <button className={ `pure-button ${ isActive ? 'pure-button-primary' : ''}` }
          onClick={ onSort }
          >
    { direction === 'asc'  ? '↑' :
      direction === 'desc' ? '↓' : '-' }
  </button>
);

SortingButton.propTypes = {
  onSort: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  direction: PropTypes.oneOf(['asc', 'desc', '']).isRequired,
}

export default SortingButton;
