import { actions } from 'data/actions/sort';

import * as reactRedux from 'react-redux';
const mockConnect = jest.spyOn(reactRedux, 'connect');
mockConnect.mockReturnValue(() => jest.fn());
// sorting order null -> 'asc' -> 'desc'

function getMapped(state, dispatch, ownProps) {
  const Connected = require('./index').default;
  expect(mockConnect).toBeCalled();

  const [
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
  ] = mockConnect.mock.calls[0];

  expect(mapStateToProps)
    .toBeInstanceOf(Function);
  expect(mapDispatchToProps)
    .toBeInstanceOf(Function);
  expect(mergeProps)
    .toBeInstanceOf(Function);

  const stateProps = mapStateToProps(state);
  expect(stateProps)
    .toEqual(state.sort);

  const dispatchProps = mapDispatchToProps(dispatch);
  expect(dispatchProps)
    .toEqual({ onSort: expect.any(Function) });

  return mergeProps(stateProps, dispatchProps, ownProps);
}

it('Key doesnt match >> by => sortKey, direction => asc', () => {
  const sortKey = 'field';
  const dispatch = jest.fn();
  const state = { sort: { by: 'other', direction: 'desc' }, };
  const props = getMapped(state, dispatch, { sortKey });

  expect(props)
    .toEqual({ isActive: false, direction: '', onSort: expect.any(Function) });

  props.onSort();
  expect(dispatch)
    .toBeCalledWith(actions.set({ by: sortKey, direction: 'asc' }));
});

it('Key match &&  direction === asc >> by == sortKey, direction: desc', () => {
  const sortKey = 'field';
  const dispatch = jest.fn();
  const state = { sort: { by: sortKey, direction: 'asc' }, };
  const props = getMapped(state, dispatch, { sortKey });

  expect(props)
    .toEqual({ isActive: true, direction: 'asc', onSort: expect.any(Function) });

  props.onSort();
  expect(dispatch)
    .toBeCalledWith(actions.set({ by: sortKey, direction: 'desc' }));
});

it('Key match &&  direction === desc >> by == null, direction: null', () => {
  const sortKey = 'field';
  const dispatch = jest.fn();
  const state = { sort: { by: sortKey, direction: 'desc' }, };
  const props = getMapped(state, dispatch, { sortKey });

  expect(props)
    .toEqual({ isActive: true, direction: 'desc', onSort: expect.any(Function) });

  props.onSort();
  expect(dispatch)
    .toBeCalledWith(actions.set({ by: null, direction: null }));
});
