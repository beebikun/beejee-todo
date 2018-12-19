import store from 'data/storage';
import { login } from './utils';

const WRONG_DATA = { username: 'u', password: 'p' };
const ERROR = 'Username or password is wrong';

it('Login error', async (done) => {
  await login(WRONG_DATA, { isLogin: false, isFailed: true }, ERROR);

  done();
});