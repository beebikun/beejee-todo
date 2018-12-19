import * as React from 'react';
import { shallow } from 'enzyme';

import TaskList from './index';

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
const ths = [
  ['#', 'id', true],
  ['Username', 'username', true],
  ['Email', 'email', true],
  ['Text', 'text', ],
  ['Status', 'status', true],
  ['', 'image_path', ],
];

describe.each`
  isLogin    | ths
  ${ false } | ${ ths }
  ${ true }  | ${ [...ths, ['', 'edit', ]] }
`('User is login: $isLogin', ({isLogin, ths}) => {
  const props = { tasks, isLogin };
  const wrapper = shallow(<TaskList { ...props } />);

  it('Expect tasks list', () => {
    const tasksItems = wrapper.find('.TaskRow');
    expect(tasksItems)
      .toHaveLength(tasks.length);
    tasks.forEach((task, idx) => {
      const item = tasksItems.at(idx);
      expect(item.props())
        .toMatchObject({ task });
    });
  });

  describe('Header', () => {
    const thItems = wrapper.find('th');

    it('Total length', () => {
      expect(thItems)
        .toHaveLength(ths.length);
    });

    ths.forEach(([title, sortKey, hasButton], idx) => {
      it(sortKey, () => {
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
  });
});
