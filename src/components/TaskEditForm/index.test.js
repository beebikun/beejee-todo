import * as React from 'react';
import { shallow } from 'enzyme';

import TaskEditForm from './index';

const task = {
  id: 2,
  username: 'Dipper',
  email: 'dipper.pines@gf.com',
  text: 'Solve the secret',
  status: 10,
  image_path: 'awesome_img_src',
};
const fields = [
  ['id',],
  ['username',],
  ['email',],
  ['text', true],
  ['status', true],
  ['image_path',],
  ['save_button',],
];

it('render without crashing', () => {
  const props = {
    task, onSave: jest.fn(),
  };
  const wrapper = shallow(<TaskEditForm { ...props } />);
  expect(wrapper.find('Task').props())
    .toHaveProperty('task', task);

  expect(wrapper.state())
    .toEqual({
      text: task.text,
      status: task.status.toString(),
    });
});

function getElements(wrapper) {
  const Task = wrapper.find('Task');
  return Task.props();
}

describe('buttonElement', () => {
  const onSave = jest.fn();
  const props = {
    task, onSave,
  };
  const wrapper = shallow(<TaskEditForm { ...props } />);

  it('expect button to be button', () => {
    const { buttonElement } = getElements(wrapper);
    expect(buttonElement.type)
      .toEqual('button');
  });

  it('initially disabled', () => {
    expectButton(wrapper, { isEnable: false });
  });

  it('active after changes', () => {
    wrapper.setState({ text: task.text + 'edited' });
    expectButton(wrapper, { isEnable: true });
  });

  it('disabled if text is empty', () => {
    wrapper.setState({ text: '' });
    expectButton(wrapper, { isEnable: false });
  });

  it('test submit', () => {
    const newText = task.text + 'edited';
    const newStatus = '0';
    wrapper.setState({ text: newText, status: newStatus });
    const { buttonElement } = getElements(wrapper);
    buttonElement.props.onClick();
    expect(onSave)
      .toHaveBeenCalledWith({
        text: newText,
        status: 0,
      });
  });
});


describe('statusElement', () => {
  const props = {
    task, onSave: jest.fn(),
  };
  const wrapper = shallow(<TaskEditForm { ...props } />);

  it('initial state', () => {
    const { statusElement } = getElements(wrapper);
    expect(statusElement.props)
      .toMatchObject({
        onChange: wrapper.instance().handleStatusChange,
        value: task.status.toString(),
        children: expect.any(Array),
      });
    expect(statusElement.props.children)
      .toHaveLength(2);
  });

  it('change value', () => {
    const { statusElement } = getElements(wrapper);
    statusElement.props.onChange({ target: { value: '0' } });
    expect(wrapper.state())
      .toHaveProperty('status', '0');
    expectButton(wrapper, { isEnable: true });
  });
});


describe('textElement', () => {
  const props = {
    task, onSave: jest.fn(),
  };
  const wrapper = shallow(<TaskEditForm { ...props } />);

  it('initial state', () => {
    const { textElement } = getElements(wrapper);
    const [ input, errorMsg ] = textElement.props.children;

    expect(input.type)
      .toEqual('input');
    expect(input.props)
      .toMatchObject({
        type: 'text',
        onChange: wrapper.instance().handleTextChange,
        value: task.text,
      });

    expect(errorMsg)
      .toBe(null);
  });

  it('change value', () => {
    const newText = task.text + 'edited';
    wrapper.setState({ text: newText });

    const { textElement } = getElements(wrapper);
    const [ input, errorMsg ] = textElement.props.children;
    expect(input.props)
      .toHaveProperty('value', newText);
    expect(errorMsg)
      .toBe(null);
  });

  it('show error when value is empyu', () => {
    const newText = '';
    wrapper.setState({ text: newText });

    const { textElement } = getElements(wrapper);
    const [ input, errorMsg ] = textElement.props.children;
    expect(input.props)
      .toHaveProperty('value', newText);
    expect(errorMsg)
      .not.toBe(null);
    expect(errorMsg.props.children)
      .toEqual('This field is required.');
  });
});


function expectButton(wrapper, { isEnable }) {
  const { buttonElement } = getElements(wrapper);
  expect(buttonElement.props)
    .toMatchObject({
      disabled: isEnable ? false : true,
      onClick: isEnable ? wrapper.instance().submit : null,
    });
}
