import React from 'react';
import PropTypes from 'prop-types';

const FormErrorMessage = ({ errors }) => {
  if (!errors) return;

  return (
    <div className="pure-control-group">
      { errors.map((msg, idx) => (
          <span className="pure-form-message" key={ idx }>
            { msg }
          </span>
        )) }
    </div>
  );
}

FormErrorMessage.propTypes = {
  errors: PropTypes.array,
}

export default FormErrorMessage;
