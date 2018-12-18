import api from './index';

it('fetch items', () => {
  const result = api.fetchItems({});

  expect(result)
    .toHaveLength(2);
});