import React from 'react';
import PropTypes from 'prop-types';

import FormErrorMessage from 'components/FormErrorMessage';

import './index.scss';


const ERRORS = {
  email: 'Email is invalid.',
  fields: 'All fields are required.',
};



class SubmitForm extends React.Component {
  n = 0;

  constructor(props) {
    super(props);
    this.state = this.getInitState();
  }

  _fields2object(getValue) {
    return this.props.fields.reduce((bucket, { name }) => {
      const formName = this.getName(name);
      const value = getValue ? getValue() : '';
      bucket[formName] = value;
      return bucket;
    }, {});
  }

  getInitState() {
    return {
      touched: false,
      item: this._fields2object(),
    }
  }

  getName(name) {
    /* generate uniq name */
    return  this.props.formName + name;
  }

  setValue(fieldName, value) {
    const item = { ...this.state.item, [fieldName]: value };
    this.setState({ item, touched: true, });
  }

  handleUserInput = (e) => {
    const value = e.target.value;
    const fieldName = e.target.name;
    this.setValue(fieldName, value);
  }

  handleUpload = (e) => {
    const value = e.target.files[0];
    const fieldName = e.target.name;
    this.setValue(fieldName, value);
  }

  submit = (e) => {
    this.n += 1;

    e.preventDefault();
    const values = {...this.state.item};
    const item = this.props.fields
      .reduce((bucket, { name }) => {
        const formName = this.getName(name);
        bucket[name] = values[formName];
        return bucket;
      }, {});
    this.props.onSubmit(item);


    const initState = this.getInitState();
    this.setState(initState);
  }

  formsErrors() {
    const isEmailInvalid = () => {
      const emailField = this.props.fields.find(({ type }) => type === 'email');
      if (!emailField) return false;
      const formName = this.getName(emailField.name);
      const v = this.state.item[formName];
      if (typeof v !== 'string' || v.length === 0) return false;

      return !v.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    }
    const notAllStringFields = () => {
      return Object.values(this.state.item).some(v => v.length === 0);
    }

    const emailError = isEmailInvalid() ? [ ERRORS.email ] : [];
    const fieldsError = notAllStringFields(this.state) ? [ ERRORS.fields ] : [];
    const stateErrors = emailError.concat(fieldsError);

    return this.state.touched ? stateErrors : (this.props.errors || []);
  }

  render() {
    const { touched } = this.state;
    const errors = this.formsErrors();
    const isDisabled = !touched || errors.length > 0;
    const errorMsg = errors.length > 0 ? <FormErrorMessage errors={errors} /> : null;

    const fields = this.props.fields.map(({ name, type }) => {
      const formName = this.getName(name);
      const title = name.toUpperCase();
      const inputProps = {
        type,
        name: formName,
        id: formName,
      };

      if (type === 'file') {
        inputProps.accept = 'image/*';
        inputProps.onChange = this.handleUpload;
      } else {
        inputProps.placeholder = title;
        inputProps.onChange = this.handleUserInput;
      }

      // use prefix in key to clear inputs values after submit
      const key = `${ this.n }_${ formName }`;

      return (
        <div key={ key }>
          <label htmlFor={ formName }>{ title }*:</label>
          <input { ...inputProps } />
        </div>
      );
    });

    return (
      <form className="pure-form pure-form-stacked SubmitForm"
            onSubmit={ isDisabled ? undefined : this.submit }
            >
        <fieldset>

          { fields }

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
    );
  }
}


SubmitForm.propTypes = {
  formName: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
}

export default SubmitForm;
