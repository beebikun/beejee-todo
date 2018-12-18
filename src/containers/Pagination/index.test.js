import { actions } from 'data/actions/page';

import * as reactRedux from 'react-redux';
const mockConnect = jest.spyOn(reactRedux, 'connect');
mockConnect.mockReturnValue(() => jest.fn());

it('Injected props', () => {
  const state = { page: { current: 1, max: 10 } };
  const pageNumber = 5;

  const Connected = require('./index').default;
  expect(mockConnect).toBeCalled();
  const [mapStateToProps, mapDispatchToProps] = mockConnect.mock.calls[0];

  expect(mapStateToProps)
    .toBeInstanceOf(Function);
  const stateProps = mapStateToProps(state);
  expect(stateProps).toEqual({ page: state.page });

  expect(mapDispatchToProps)
    .toBeInstanceOf(Function);
  const dispatch = jest.fn();
  const { setCurrent } = mapDispatchToProps(dispatch);
  expect(setCurrent)
    .toBeInstanceOf(Function);
  setCurrent(pageNumber);
  expect(dispatch)
    .toHaveBeenCalledWith(actions.setCurrent(pageNumber));
});
