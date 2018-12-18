import * as React from 'react';
import { shallow } from 'enzyme';

import Pagination from './element';

it('render without crashing', () => {
  const current = 10;
  const onNext = jest.fn();
  const onPrev = jest.fn();
  const props = { current, onNext, onPrev };
  const wrapper = shallow(<Pagination {...props} />);
  const items = wrapper.find('PaginationButton');
  expect(items)
    .toHaveLength(3);

  expect(items.at(0).props())
    .toEqual({ symbol: '⇐', onClick: onPrev });
  expect(items.at(1).props())
    .toEqual({ symbol: current.toString() });
  expect(items.at(2).props())
    .toEqual({ symbol: '⇒', onClick: onNext });
});