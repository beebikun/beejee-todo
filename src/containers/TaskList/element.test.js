import * as React from 'react';
import { shallow } from 'enzyme';

import TaskList from './element';

it('render without crashing', () => {
  const tasks = [
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
  const wrapper = shallow(<TaskList tasks={ tasks } />);
  const items = wrapper.find('Task');
  expect(items)
    .toHaveLength(tasks.length);
  tasks.forEach((task, idx) => {
    const item = items.at(idx);
    expect(item.props())
      .toEqual(task);
  });
});