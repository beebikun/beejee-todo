import React from 'react';
import PropTypes from 'prop-types';

import FormErrorMessage from 'components/FormErrorMessage';

import './element.scss';


const ERRORS = {
  email: 'Email is invalid.',
  fields: 'All fields are required.',
};

class TaskAdd extends React.Component {
  state = {
    username: '',
    email: '',
    text: '',
    image: '',

    touched: false,
  };

  handleUserInput = (e) => {
    const value = e.target.value;
    const fieldName = e.target.name;

    this.setState({ [fieldName]: value, touched: true, });
  }

  handleUpload = (e) => {
    const value = e.target.files[0];
    this.setState({ image: value, touched: true, });
  }

  submit = (e) => {
    e.preventDefault();
    const { touched, ...task } = this.state;
    this.props.onAdd(task);
  }

  formsErrors() {
    const emailError = isEmailValid(this.state.email) ? [] : [ERRORS.email];
    const fieldsError = notAllStringFields(this.state) ? [ERRORS.fields] : [];

    return emailError.concat(fieldsError);

    function notAllStringFields({ username, email, text, image }) {
      return [username, email, text, image]
        .some(v => v.length === 0);
    }

    function isEmailValid(v) {
      if (typeof v !== 'string' || v.length === 0) return true;
      return v.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    }
  }

  render() {
    const { touched } = this.state;
    const errors = this.formsErrors();
    const errorMsg = (errors.length > 0 && touched) ? <FormErrorMessage errors={errors} /> : null;
    const isDisabled = !touched || errors.length > 0;

    return (
      <div className="TaskAdd">
        <div className="pure-u-1-5" />

        <div className="pure-u-3-5">
          <form className="pure-form pure-form-aligned"
                onSubmit={ isDisabled ? undefined : this.submit }
                >
            <fieldset>
              <h3>Add a task</h3>

              <div className="pure-control-group">
                <label htmlFor="username">Username*:</label>
                <input id="username"
                       type="text"
                       name="username"
                       placeholder="Username"
                       onChange={ this.handleUserInput }
                       />
              </div>

              <div className="pure-control-group">
                <label htmlFor="email">Email*:</label>
                <input id="email"
                       type="email"
                       name="email"
                       placeholder="Email"
                       onChange={ this.handleUserInput }
                       />
              </div>

              <div className="pure-control-group">
                <label htmlFor="text">Text*:</label>
                <input id="text"
                       type="text"
                       name="text"
                       placeholder="Text"
                       onChange={ this.handleUserInput }
                       />
              </div>

              <div className="pure-control-group">
                <label htmlFor="image">Image*:</label>
                <input id="image"
                       type="file"
                       accept="image/*"
                       name="image"
                       onChange={ this.handleUpload }
                       />
              </div>

              { errorMsg }

              <div className="pure-controls">
                <button type="submit"
                        className="pure-button pure-button-primary"
                        disabled={ isDisabled }
                        >
                  Submit
                </button>
              </div>

            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}


TaskAdd.propTypes = {
  onAdd: PropTypes.func.isRequired,
}

export default TaskAdd;
