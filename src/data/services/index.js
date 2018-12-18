class Api {
  fetchItems({ page, sortField, sortDirection }) {
    return [
      {
        id: 1,
        username: 'Finn',
        email: 'finn.humat@at.com',
        text: 'Save the princess',
        status: 10,
        image_path: 'https://goo.gl/61pq8a',
      },
      {
        id: 2,
        username: 'Dipper',
        email: 'dipper.pines@gf.com',
        text: 'Solve the secret',
        status: 0,
        image_path: 'https://goo.gl/TDDqFT',
      },
    ];
  }
}

export default new Api();
