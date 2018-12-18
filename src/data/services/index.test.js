import api from './index';

it('fetch items', async (done) => {
  const result = await api.fetchItems({});

  const expected = {
    tasks: expect.any(Array),
    total: expect.any(Number),
    pagesCount: expect.any(Number),
  };

  expect(result)
    .toEqual(expected);

  done();
});

it('add item', async (done) => {
  const item = {
    username: 'username',
    email: 'email',
    text: 'text',
    image: 'image',
  };
  const result = await api.addItem(item);

  const expected = {
    ...item,
    image: undefined,
    id: expect.any(Number),
    image_path: expect.any(String),
    status: 0,
  };

  expect(result)
    .toEqual(expected);

  done();
});

it('edit item', async (done) => {
  const itemId = 1;
  const item = {
    status: 10,
    text: 'edited text',
  };
  const result = await api.editItem(itemId, item);

  expect(result)
    .toEqual({});

  done();
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
