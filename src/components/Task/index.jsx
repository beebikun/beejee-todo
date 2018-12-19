import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';


const Task = ({ task, buttonElement, statusElement, textElement, className }) => (
  <tr className={`Task ${ className || '' }`}>
    <td className='Task__id'>
      { task.id }
    </td>
    <td className='Task__username'>
      { task.username }
    </td>
    <td className='Task__email'>
      { task.email }
    </td>
    <td className='Task__text'>
      { textElement ? textElement : task.text }
    </td>
    <td className='Task__status'>
      { statusElement ? statusElement : task.status }
    </td>
    <td className='Task__img'>
      <img src={ task.image_path } alt="img" />
    </td>
    {
      !buttonElement ? null :
      <td className='Task__btn'>
        { buttonElement }
      </td>
    }
  </tr>
);

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    image_path: PropTypes.string.isRequired,
  }),
  buttonElement: PropTypes.element,
  statusElement: PropTypes.element,
  textElement: PropTypes.element,
};

export default Task;
