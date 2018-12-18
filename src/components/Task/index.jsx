import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';


const Task = ({ id, username, email, text, status, image_path }) => (
  <tr className='Task'>
    <td className='Task__id'>
      { id }
    </td>
    <td className='Task__username'>
      { username }
    </td>
    <td className='Task__email'>
      { email }
    </td>
    <td className='Task__text'>
      { text }
    </td>
    <td className='Task__status'>
      { status }
    </td>
    <td className='Task__img'>
      <img src={ image_path } />
    </td>
  </tr>
);

Task.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
  image_path: PropTypes.string.isRequired,
}

export default Task;
