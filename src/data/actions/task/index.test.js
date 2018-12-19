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

const rawTask = { username: 'u', text: 't', email: 'email@e.com', image: 'i' };
const task = { ...rawTask, id: 1 };
const tasks = [ { id: 1 }, { id: 2 } ];

describe.each`
  name            | cname      | payloads
  ${'fetchItems'} | ${'FETCH'} | ${ { SUCCESS: { tasks } } }
  ${'addItem'}    | ${'ADD'}   | ${ { REQUEST: rawTask, SUCCESS: task } }
`('$name', expectAsync);

