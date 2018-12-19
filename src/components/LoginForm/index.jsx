import React from 'react';
import PropTypes from 'prop-types';

import SubmitForm from 'components/SubmitForm';

const FIELDS = [
  { name: 'username', type: 'text' },
  { name: 'password', type: 'password' },
];


const LoginForm = ({ onLogin, isLogin, isFailed }) => {
  if (isLogin) {
    return (<h2>Welcome!</h2>);
  }

  const errors = isFailed ? ['Username or password is wrong'] : null;
  return (
    <div>
      <h2> Login </h2>
      <SubmitForm fields={ FIELDS }
                  errors={ errors }
                  onSubmit={ onLogin }
                  formName="LoginForm"
                  />
    </div>
  );
};


LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
  isFailed: PropTypes.bool.isRequired,
}

export default LoginForm;
