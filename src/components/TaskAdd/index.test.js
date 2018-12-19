import * as React from 'react';
import { shallow } from 'enzyme';

import TaskAdd from './index';


it('render without crashing', () => {
  const onAdd = jest.fn();
  const wrapper = shallow(<TaskAdd onAdd={ onAdd } />);
  const SubmitForm = wrapper.find('SubmitForm');
  expect(SubmitForm.props())
    .toEqual({
      onSubmit: onAdd,
      fields: expect.any(Array),
      formName: 'TaskAdd',
    });
});

