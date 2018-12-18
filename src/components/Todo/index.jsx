import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';


const Todo = ({ id, username, email, text, status, image_path }) => (
  <tr className='Todo'>
    <td className='Todo__id'>
      { id }
    </td>
    <td className='Todo__username'>
      { username }
    </td>
    <td className='Todo__email'>
      { email }
    </td>
    <td className='Todo__text'>
      { text }
    </td>
    <td className='Todo__status'>
      { status }
    </td>
    <td className='Todo__img'>
      <img src={ image_path } />
    </td>
  </tr>
);

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
  image_path: PropTypes.string.isRequired,
}

export default Todo;
