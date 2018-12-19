import axios, { tasks, total_task_count } from 'axios';
import api from './index';

const task = tasks[0];
const newTaskData = {
  username: 'Finn',
  email: 'finn.humat@at.com',
  text: 'Save the princess',
  image: new Blob(['image'], {type: 'image/png'}),
};

const pagesCount = 4

describe('Fetch items', () => {
  const page = 10;
  const sortField = 'username';
  const sortDirection = 'asc';

  it('Test params', async (done) => {
    await getResult({ status: 'ok', message: {} });

    expect(axios.get)
      .toBeCalledWith(expect.any(String),
                      expect.objectContaining({
        params: {
          page,
          developer: expect.any(String),
          sort_field: sortField,
          sort_direction: sortDirection,
        },
      }));

    done();
  });

  it('Error', (done) => {
    return getResult({ status: 'error' }).catch(() => {
      done();
    });
  });

  it('Success', async (done) => {
    const result = await getResult({
      status: 'ok',
      message: {
        tasks, total_task_count,
      },
    });

    expect(result)
      .toEqual({
        tasks, pagesCount,
        total: total_task_count,
      });

    done();
  });


  async function getResult(data) {
    axios.get.mockClear();
    axios.get.mockReturnValueOnce(Promise.resolve({ data }));

    const result = await api.fetchItems({ page, sortField, sortDirection });

    return result;
  }

});

describe('Add item', () => {
  it('Success', async (done) => {
    const result = await getResult({
      status: 'ok',
      message: task,
    });

    expect(result)
      .toEqual(task);

    done();
  });

  it('Error', (done) => {
    return getResult({ status: 'error' }).catch(() => {
      done();
    });
  });


  async function getResult(data) {
    axios.post.mockClear();
    axios.post.mockReturnValueOnce(Promise.resolve({ data }));

    const result = await api.addItem(newTaskData);

    return result;
  }
});

describe('Edit item', () => {
  it('Success', async (done) => {
    const result = await getResult({
      status: 'ok',
      message: {},
    });

    expect(result)
      .toEqual(task);

    done();
  });

  it('Error', (done) => {
    return getResult({ status: 'error' }).catch(() => {
      done();
    });
  });

  async function getResult(data) {
    axios.post.mockClear();
    axios.post.mockReturnValueOnce(Promise.resolve({ data }));

    const result = await api.editItem(task);

    return result;
  }
});



describe('login', () => {
  it('success', async (done) => {
    const data = { username: 'admin', password: '123' };

    const result = await api.login(data);

    expect(result).toBe(true);

    done()
  });

  it('error', async (done) => {
    const data = { username: 'nyak', password: 'nyak' };

    const result = await api.login(data);

    expect(result).toBe(false);

    done()
  });
});
