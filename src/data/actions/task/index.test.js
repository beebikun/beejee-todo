import { CONSTANTS, actions } from './index';


function expectAsync({asyncAction, constants, payloads, contexts}) {
  payloads.ERROR = contexts.ERROR = Error('You\'ve been a bad boy.');

  it.each`
    name | constantName
    ${ 'request' } | ${'REQUEST'}
    ${ 'success' } | ${'SUCCESS'}
    ${ 'failure' } | ${'ERROR'}
  `('$name', ({ name, constantName }) => {
    const payload = payloads[constantName];
    const context = contexts[constantName];
    const type = constants[constantName];

    const result = asyncAction[name](context);
    expect(result).toEqual({
      payload, type,
    });
  });
};

const tasks = [ { id: 1 }, { id: 2 } ];


describe('fetch', () => {
  expectAsync({
    asyncAction: actions.fetchItems,
    constants: CONSTANTS.FETCH,
    contexts: { SUCCESS: { tasks } },
    payloads: { SUCCESS: { tasks } },
  });
});
