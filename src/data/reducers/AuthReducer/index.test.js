import { actions } from 'data/actions/auth';
import reducer from './index';

const initialState = {
  isLogin: false,
  isFailed: false,
};


it('initial state', () => {
  const next = reducer(undefined, {});

  expect(next)
    .toEqual(initialState);
});


it('Unknown type: return old state', () => {
  const prev = { isLogin: false, isFailed: true };
  const payload = 'null';
  const next = reducer(prev, { type: 'UNKNOWN', payload });

  expect(next)
    .toEqual(prev);
});

it('CONSTANTS.LOGIN.REQEST >> isLogin: false, isFailed: false ', () => {
  const prev = { isLogin: false, isFailed: true };
  const payload = { username: 'u', password: 'p' };
  const next = reducer(prev, actions.login.request(payload));

  expect(next)
    .toEqual({ isLogin: false, isFailed: false });
});

it('CONSTANTS.LOGIN.SUCCESS, isSuccess == true >> isLogin: true, isFailed: false', () => {
  const prev = { isLogin: false, isFailed: true };
  const payload = true;
  const next = reducer(prev, actions.login.success(payload));

  expect(next)
    .toEqual({ isLogin: true, isFailed: false });
});

it('CONSTANTS.LOGIN.SUCCESS, isSuccess == false >> isLogin: false, isFailed: true', () => {
  const prev = { isLogin: false, isFailed: false };
  const payload = false;
  const next = reducer(prev, actions.login.success(payload));

  expect(next)
    .toEqual({ isLogin: false, isFailed: true });
});

