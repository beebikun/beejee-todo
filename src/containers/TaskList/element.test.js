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
  const tasksItems = wrapper.find('Task');
  expect(tasksItems)
    .toHaveLength(tasks.length);
  tasks.forEach((task, idx) => {
    const item = tasksItems.at(idx);
    expect(item.props())
      .toEqual(task);
  });

  const ths = [
    ['#', 'id', true],
    ['Username', 'username', true],
    ['Email', 'email', true],
    ['Text', 'text', ],
    ['Status', 'status', true],
    ['', 'image_path', ],
  ];
  const thItems = wrapper.find('th');
  expect(thItems)
    .toHaveLength(ths.length);
  ths.forEach(([title, sortKey, hasButton], idx) => {
    const item = thItems.at(idx);
    if (hasButton) {
      expect(item.childAt(0).text())
        .toEqual(title);
      const button = item.childAt(1);
      expect(button.props())
        .toEqual({ sortKey, className: 'SortingButton' });
    } else {
      expect(item.text())
        .toEqual(title);
    }
  });
});