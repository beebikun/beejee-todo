import React from 'react';
import PropTypes from 'prop-types';

import PaginationButton from 'components/PaginationButton';

import './index.scss';


class Pagination extends React.Component {
  componentDidMount() {
    this.props.setCurrent(1);
  }

  render() {
    const { page, setCurrent } = this.props;
    const { max, current } = page;
    const onPrev = current > 1 ? handlePrev : undefined;
    const onNext = current < max ? handleNext : undefined;

    return (
      <div className="pure-button-group Pagination"
           role="group"
           aria-label="paginations">
        <PaginationButton symbol="⇐" onClick={ onPrev } />
        <PaginationButton symbol={ current.toString() } />
        <PaginationButton symbol="⇒" onClick={ onNext } />
      </div>
    );

    function handlePrev() {
      setCurrent(current - 1);
    }

    function handleNext() {
      setCurrent(current + 1);
    }
  }
}


Pagination.propTypes = {
  setCurrent: PropTypes.func,
  page: PropTypes.shape({
    current: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }).isRequired,
}

export default Pagination;
