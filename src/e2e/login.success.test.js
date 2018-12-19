import { login } from './utils';

const DATA = { username: 'admin', password: '123' };

it('Login success', async (done) => {
  await login(DATA, { isLogin: true, isFailed: false });

  done();
});