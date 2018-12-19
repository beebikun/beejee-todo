import axios from 'axios';
import store from 'data/storage';
import { actions } from 'data/actions/auth';
import { getWrapper, skipTick } from './utils';

const PREFIX = 'TaskAdd';
const FIELDS = { username: 'username', email: 'email@ex.com', text: 'text', image: 'img.png' };


it('edit task', async (done) => {
  const wrapper = await getWrapper();
  store.dispatch(actions.login.success(true));
  wrapper.update();
  const prevState = store.getState();

  const IDX = 1;
  const TaskRow = wrapper.find('TaskRow').at(IDX);
  const { task } = TaskRow.props();
  const newText = task.text + 'EDITED';
  const taskId = TaskRow.props().task.id;

  TaskRow.find('button').simulate('click');

  expect(store.getState())
    .toEqual({
      ...prevState,
      editTaskId: task.id,
    });

  const EditTaskForm = wrapper.find('TaskEditForm').at(0);
  expect(EditTaskForm.props().task.id)
    .toEqual(task.id);
  EditTaskForm.find('input').simulate('change', { target: { value: newText } });

  EditTaskForm.find('button').simulate('click');

  await skipTick();
  await skipTick();

  expect(store.getState())
    .toEqual({
      ...prevState,
      tasks: [
        prevState.tasks[0],
        {...prevState.tasks[1], text: newText },
        prevState.tasks[2],
      ],
    });

  done();
});
