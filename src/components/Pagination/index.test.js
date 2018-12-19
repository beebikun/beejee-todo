import * as React from 'react';
import { shallow } from 'enzyme';

import Pagination from './index';

function getItems(page, setCurrent) {
  const props = { page, setCurrent };
  const wrapper = shallow(<Pagination {...props} />);
  expect(setCurrent)
    .toHaveBeenCalledWith(1);

  const items = wrapper.find('PaginationButton');
  expect(items)
    .toHaveLength(3);

  expect(items.at(0).props().symbol)
    .toEqual('⇐');
  expect(items.at(1).props())
    .toEqual({ symbol: page.current.toString() });
  expect(items.at(2).props().symbol)
    .toEqual('⇒');

  return {
    onPrev: items.at(0).props().onClick,
    onNext: items.at(2).props().onClick,
  };
}


it('current less than max', () => {
  const page = { current: 10, max: 20 };
  const setCurrent = jest.fn();
  const { onPrev, onNext } = getItems(page, setCurrent);

  expect(onPrev)
    .toBeInstanceOf(Function);
  onPrev();
  expect(setCurrent).toHaveBeenLastCalledWith(page.current - 1);

  expect(onNext)
    .toBeInstanceOf(Function);
  onNext();
  expect(setCurrent).toHaveBeenLastCalledWith(page.current + 1);
});


it('current is 1', () => {
  const page = { current: 1, max: 20 };
  const setCurrent = jest.fn();
  const { onPrev, onNext } = getItems(page, setCurrent);

  expect(onPrev)
    .toBeUndefined();

  expect(onNext)
    .toBeInstanceOf(Function);
  onNext();
  expect(setCurrent).toHaveBeenLastCalledWith(page.current + 1);
});


it('current is max', () => {
  const page = { current: 20, max: 20 };
  const setCurrent = jest.fn();
  const { onPrev, onNext } = getItems(page, setCurrent);

  expect(onPrev)
    .toBeInstanceOf(Function);
  onPrev();
  expect(setCurrent).toHaveBeenLastCalledWith(page.current - 1);

  expect(onNext)
    .toBeUndefined();
});
