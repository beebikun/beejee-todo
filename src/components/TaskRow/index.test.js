import * as React from 'react';
import { shallow } from 'enzyme';

import TaskRow from './index';

const task = {
  id: 2,
  username: 'Dipper',
  email: 'dipper.pines@gf.com',
  text: 'Solve the secret',
  status: 10,
  image_path: 'awesome_img_src',
};

it('isEdit === true', () => {
  const onEdit = jest.fn();
  const props = {
    task, onEdit,
    isLogin: true,
    isEdit: true,
  };
  const wrapper = shallow(<TaskRow {...props} />);
  expect(wrapper.name())
    .toMatch('(TaskEditForm)');

  const TaskEditForm = wrapper.get(0);
  expect(TaskEditForm.props)
    .toEqual({ task });
});


describe('isEdit === false', () => {
  const isEdit = false;

  it.each`
    isLogin    | hasButton
    ${ true }  | ${ true }
    ${ false } | ${ false }
  `('isLogin: $isLogin', ({ isLogin, hasButton }) => {
    const onEdit = jest.fn();
    const props = {
      task, onEdit,
      isLogin, isEdit,
    };

    const wrapper = shallow(<TaskRow {...props} />);
    expect(wrapper.name())
      .toEqual('Task');

    const Task = wrapper.get(0);
    expect(Task.props)
      .toHaveProperty('task', task);
    expect(Task.props)
      .toHaveProperty('buttonElement', hasButton ? expect.any(Object) : null);
  });
});

