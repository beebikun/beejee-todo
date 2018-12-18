import * as React from 'react';
import { shallow } from 'enzyme';

import TodoList from './element';

it('render without crashing', () => {
  const todos = [
    {
      id: 1,
      username: 'Finn',
      email: 'finn.humat@at.com',
      text: 'Save the princess',
      status: 10,
      image_path: 'awesome_img_src',
    },
    {
      id: 2,
      username: 'Dipper',
      email: 'dipper.pines@gf.com',
      text: 'Solve the secret',
      status: 0,
      image_path: 'awesome_img_src',
    },
  ];
  const wrapper = shallow(<TodoList todos={ todos } />);
  const items = wrapper.find('Todo');
  expect(items)
    .toHaveLength(todos.length);
  todos.forEach((todo, idx) => {
    const item = items.at(idx);
    expect(item.props())
      .toEqual(todo);
  });
});