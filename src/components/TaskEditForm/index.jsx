import React from 'react';
import PropTypes from 'prop-types';

import Task from 'components/Task';

class TaskEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.task.status.toString(),
      text: props.task.text,
    };
  }

  handleStatusChange = (e) => {
    this.setState({ status: e.target.value });
  }

  handleTextChange = (e) => {
    this.setState({ text: e.target.value  });
  }

  submit = () => {
    this.props.onSave({
      text: this.state.text,
      status: parseInt(this.state.status),
    });
  }

  render() {
    const touched = parseInt(this.state.status) !== this.props.task.status ||
                    this.state.text !== this.props.task.text;
    const textError = this.state.text.length === 0;
    const isDisabled = textError === true || !touched;
    const buttonElement = <button className="pure-button"
                                  onClick={ isDisabled ? null : this.submit }
                                  disabled={ isDisabled }
                                  >
                            Save
                          </button>;
    const statusOptions = [0, 10].map((value) => (
        <option value={ value } key={ value }>
          { value }
        </option>
      ));
    const statusElement = <select value={ this.state.status }
                                  onChange={this.handleStatusChange} >
                            { statusOptions }
                          </select>;
    const textElement = <input type="text"
                           value={ this.state.text }
                           onChange={ this.handleTextChange }
                           />;

    return (
      <Task task={ this.props.task }
            className='pure-form'
            buttonElement={ buttonElement }
            statusElement={ statusElement }
            textElement={
              <div>
                { textElement }
                { !textError ? null :
                  <div>
                    This field is required.
                  </div>}
              </div>
            }
            />
    );
  }
}


TaskEditForm.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    image_path: PropTypes.string.isRequired,
  }),
  onSave: PropTypes.func.isRequired,
}

export default TaskEditForm;
