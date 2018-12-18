import { actions } from 'data/actions/task';

import * as reactRedux from 'react-redux';
const mockConnect = jest.spyOn(reactRedux, 'connect');
mockConnect.mockReturnValue(() => jest.fn());

it('Injected props', () => {
  const newTask = { useraname: 'u', text: 't' };

  const Connected = require('./index').default;
  expect(mockConnect).toBeCalled();
  const [mapStateToProps, mapDispatchToProps] = mockConnect.mock.calls[0];

  expect(mapStateToProps)
    .toBeFalsy();

  expect(mapDispatchToProps)
    .toBeInstanceOf(Function);

  const dispatch = jest.fn();
  const { onAdd } = mapDispatchToProps(dispatch);
  expect(onAdd)
    .toBeInstanceOf(Function);
  onAdd(newTask);
  expect(dispatch)
    .toHaveBeenCalledWith(actions.addItem.request(newTask));
});
