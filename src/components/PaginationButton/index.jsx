import React from 'react';
import PropTypes from 'prop-types';


const PaginationButton = ({ symbol, onClick }) => (
  <button className="pure-button"
          disabled={ !onClick }
          onClick={ onClick }
          >
    { symbol }
  </button>
);

PaginationButton.propTypes = {
  symbol: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default PaginationButton;
