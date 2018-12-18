import * as React from 'react';
import { shallow } from 'enzyme';

import Task from './index';


it('render without crashing', () => {
  const props = {
    id: 2,
    username: 'Dipper',
    email: 'dipper.pines@gf.com',
    text: 'Solve the secret',
    status: 10,
    image_path: 'awesome_img_src',
  };
  const wrapper = shallow(<Task {...props} />);

  const expectedItems = [
    'id', 'username', 'email', 'text', 'status', 'image_path',
  ];
  const items = wrapper.find('td');
  expect(items)
    .toHaveLength(expectedItems.length);

  expectedItems.forEach((key, idx) => {
    const item = items.at(idx);
    if (key === 'image_path') {
      const img = item.find('img').last();
      expect(img.exists())
        .toEqual(true);
      expect(img.props().src)
        .toEqual(props[key]);
    }
    else {
      expect(item.text())
        .toEqual(props[key].toString());
    }
  });
});
