import { CONSTANTS, actions } from './index';

function expectAsync({name, cname, payloads}) {
  const asyncAction = actions[name];
  const constants = CONSTANTS[cname];

  payloads.ERROR = Error('You\'ve been a bad boy.');

  it.each`
    name           | constantName
    ${ 'request' } | ${'REQUEST'}
    ${ 'success' } | ${'SUCCESS'}
    ${ 'failure' } | ${'ERROR'}
  `('$name', ({ name, constantName }) => {
    const payload = payloads[constantName];
    const type = constants[constantName];

    const result = asyncAction[name](payload);
    expect(result).toEqual({
      payload, type,
    });
  });
};


describe('Login', () => {
  expectAsync({
    name: 'login',
    cname: 'LOGIN',
    payloads: {
      REQUEST: { username: 'u', password: 'p' },
      SUCCESS: true,
    }
  });
});

