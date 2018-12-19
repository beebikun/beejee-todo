import React from 'react';
import { actions } from 'data/actions/task';

import * as reactRedux from 'react-redux';
const mockConnect = jest.spyOn(reactRedux, 'connect');
mockConnect.mockReturnValue(() => jest.fn());

jest.mock('components/TaskRow', () => <div />)

function getMapped(state, dispatch, ownProps) {
  const Connected = require('./index').default;
  expect(mockConnect).toBeCalled();

  const [
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
  ] = mockConnect.mock.calls[0];

  expect(mapStateToProps)
    .toBeInstanceOf(Function);
  expect(mapDispatchToProps)
    .toBeInstanceOf(Function);
  expect(mergeProps)
    .toBeInstanceOf(Function);

  const stateProps = mapStateToProps(state);
  expect(stateProps)
    .toEqual({
      isLogin: state.auth.isLogin,
      editTaskId: state.editTaskId,
    });

  const dispatchProps = mapDispatchToProps(dispatch);
  expect(dispatchProps)
    .toEqual({ onEdit: expect.any(Function) });

  return mergeProps(stateProps, dispatchProps, ownProps);
}

it('User is not login', () => {
  const task = { id: 1, username: 'username' };
  const state = { editTaskId: 1, auth: { isLogin: false } };
  const ownProps = { task };
  const dispatch = jest.fn();

  const props = getMapped(state, dispatch, ownProps);
  expect(props)
    .toEqual({
      isLogin: false,
      isEdit: false,
      onEdit: null,
      task,
    });
});

describe('User is login', () => {
  const task = { id: 1, username: 'username' };
  const state = { auth: { isLogin: true } };
  const ownProps = { task };

  it('editTaskId != taskId', () => {
    const editTaskId = task.id + 1;
    const editedTask = { text: 'new text' };
    const dispatch = jest.fn();

    const props = getMapped({ ...state, editTaskId }, dispatch, ownProps);
    expect(props)
      .toEqual({
        isLogin: true,
        isEdit: false,
        onEdit: expect.any(Function),
        task,
      });

    props.onEdit();
    const expectedAction = actions.setEditItem(task.id);
    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('editTaskId == taskId', () => {
    const editTaskId = task.id;
    const dispatch = jest.fn();

    const props = getMapped({ ...state, editTaskId }, dispatch, ownProps);
    expect(props)
      .toEqual({
        isLogin: true,
        isEdit: true,
        onEdit: expect.any(Function),
        task,
      });

    props.onEdit();
    const expectedAction = actions.setEditItem(task.id);
    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });

});
