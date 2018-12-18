import React from 'react';

import * as reactRedux from 'react-redux';
const mockConnect = jest.spyOn(reactRedux, 'connect');
mockConnect.mockReturnValue(() => jest.fn());

jest.mock('./element', () => (<div></div>));

it('Injected props', () => {
  const Connected = require('./index').default;
  expect(mockConnect).toBeCalledTimes(1);
  const [mapStateToProps, mapDispatchToProps] = mockConnect.mock.calls[0];

  expect(mapStateToProps)
    .toBeInstanceOf(Function);
  const state = { tasks: [ { id: 1 } ] };
  const stateProps = mapStateToProps(state);
  expect(stateProps).toEqual({ tasks: state.tasks });

  expect(mapDispatchToProps)
    .toBeUndefined();
});
