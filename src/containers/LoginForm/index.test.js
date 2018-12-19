import { actions } from 'data/actions/auth';

import * as reactRedux from 'react-redux';
const mockConnect = jest.spyOn(reactRedux, 'connect');
mockConnect.mockReturnValue(() => jest.fn());

it('Injected props', () => {
  const data = { useraname: 'u', password: 'p' };
  const state = { auth: { isFailed: false, isLogin: true } };

  const Connected = require('./index').default;
  expect(mockConnect).toBeCalled();
  const [mapStateToProps, mapDispatchToProps] = mockConnect.mock.calls[0];

  expect(mapStateToProps)
    .toBeInstanceOf(Function);
  const stateProps = mapStateToProps(state);
  expect(stateProps).toEqual(state.auth);

  expect(mapDispatchToProps)
    .toBeInstanceOf(Function);

  const dispatch = jest.fn();
  const { onLogin } = mapDispatchToProps(dispatch);
  expect(onLogin)
    .toBeInstanceOf(Function);
  onLogin(data);
  expect(dispatch)
    .toHaveBeenCalledWith(actions.login.request(data));
});
