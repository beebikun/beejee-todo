import React from 'react';
import PropTypes from 'prop-types';

import PaginationButton from 'components/PaginationButton';

import './element.scss';

const Pagination = ({ onNext, onPrev, current }) => (
  <div className="pure-button-group"
       role="group"
       ariaLabel="paginations">
    <PaginationButton symbol="⇐" onClick={ onPrev } />
    <PaginationButton symbol={ current.toString() } />
    <PaginationButton symbol="⇒" onClick={ onNext } />
  </div>
);

Pagination.propTypes = {
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  current: PropTypes.number.isRequired,
}

export default Pagination;
