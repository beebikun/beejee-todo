import { actions } from 'data/actions/task';

import * as reactRedux from 'react-redux';
const mockConnect = jest.spyOn(reactRedux, 'connect');
mockConnect.mockReturnValue(() => jest.fn());

it('Injected props', () => {
  const editedTask = { text: 'new text', status: 0 };
  const task = { id: 1, username: 'username', text: 'old', };
  const expectedTask = { id: 1, username: 'username', text: 'new text', status: 0 };
  const ownProps = { task };
  const dispatch = jest.fn();

  const Connected = require('./index').default;
  expect(mockConnect).toBeCalled();
  const [
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  ] = mockConnect.mock.calls[0];

  expect(mapStateToProps)
    .toBeFalsy();
  const stateProps = null;

  expect(mapDispatchToProps)
    .toBeInstanceOf(Function);
  const dispatchProps = mapDispatchToProps(dispatch);

  expect(mapDispatchToProps)
    .toBeInstanceOf(Function);
  const props = mergeProps(stateProps, dispatchProps, ownProps);
  expect(props)
    .toEqual({
      task,
      onSave: expect.any(Function),
    });

  props.onSave(editedTask);
  const expectedAction = actions.editItem.request(expectedTask);
  expect(dispatch)
    .toHaveBeenCalledWith(expectedAction);
});
