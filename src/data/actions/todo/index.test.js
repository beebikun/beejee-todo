import { CONSTANTS, actions } from './index';


function expectAsync({asyncAction, constants, payloads}) {
  payloads.ERROR = Error('You\'ve been a bad boy.');

  it.each`
    name | constantName
    ${ 'request' } | ${'REQUEST'}
    ${ 'success' } | ${'SUCCESS'}
    ${ 'failure' } | ${'ERROR'}
  `('$name', ({ name, constantName }) => {
    const payload = payloads[constantName];
    const result = asyncAction[name](payload);
    expect(result).toEqual({
      payload,
      type: constants[constantName],
    });
  });
};

const todos = [ { id: 1 }, { id: 2 } ];


describe('fetch', () => {
  expectAsync({
    asyncAction: actions.fetchItems,
    constants: CONSTANTS.FETCH,
    payloads: { SUCCESS: todos },
  });
});
