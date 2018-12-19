import * as React from 'react';
import { shallow } from 'enzyme';

import Task from './index';

const task = {
  id: 2,
  username: 'Dipper',
  email: 'dipper.pines@gf.com',
  text: 'Solve the secret',
  status: 10,
  image_path: 'awesome_img_src',
};

it('render without crashing', () => {
  const props = {
    task, className: 'test',
  };
  const wrapper = shallow(<Task { ...props } />);
  expect(wrapper.hasClass('test'))
    .toBe(true);
});


const EXPECTED_FIELDS = [
  'id', 'username', 'email', 'text', 'status', 'image_path',
];

const ELEMENTS = {
  buttonElement: <button>SAVE</button>,
  statusElement: <input value={task.status.toString()} />,
  textElement: <input value={task.text} />,
};

describe.each`
  elements | expectedFields
  ${ undefined } | ${ EXPECTED_FIELDS }
  ${ ELEMENTS } | ${ [ ...EXPECTED_FIELDS, 'button' ] }
`('Element: $elements', ({ elements={}, expectedFields }) => {
  const props = {
    task, ...elements
  };
  const wrapper = shallow(<Task { ...props } />);
  const items = wrapper.find('td');
  it('total tds length', () => {
    expect(items)
      .toHaveLength(expectedFields.length);
  });

  expectedFields.forEach((key, idx) => {
    it(key, () => {
      const item = items.at(idx);
      const value = task[key] && task[key].toString();
      if (key === 'image_path') {
        const img = item.find('img').last();
        expect(img.exists())
          .toEqual(true);
        expect(img.props().src)
          .toEqual(value);
      }
      else if (key === 'status' && elements.statusElement ||
               key === 'text' && elements.textElement) {
        const input = item.childAt(0);
        expect(input.props())
          .toEqual({ value });
      }
      else if (key === 'button') {
        const button = item.childAt(0);
        expect(button.name())
          .toEqual('button');
      }
      else {
        expect(item.text())
          .toEqual(value);
      }
    });
  });
});

