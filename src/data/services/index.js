const perPage = 3;
const BASE_URL = '';

class Api {
  fetchItems({ page, sortField, sortDirection }) {
    const tasks = [
      {
        id: Math.round(Math.random() * 10),
        username: 'Finn',
        email: 'finn.humat@at.com',
        text: 'Save the princess',
        status: 10,
        image_path: 'https://goo.gl/61pq8a',
      },
      {
        id: Math.round(Math.random() * 10),
        username: 'Dipper',
        email: 'dipper.pines@gf.com',
        text: 'Solve the secret',
        status: 0,
        image_path: 'https://goo.gl/TDDqFT',
      },
      {
        id: Math.round(Math.random() * 10),
        username: 'Star',
        email: 'star.butterfly@mewni.com',
        text: 'Fight with the evil forces',
        status: 10,
        image_path: 'https://goo.gl/bGcFdD',
      },
    ];
    const total = 10;
    const pagesCount = Math.ceil(total / perPage);

    return Promise.resolve({
      tasks, total, pagesCount,
    });
  }

  addItem({ username, email, text, image }) {
    return Promise.resolve({
      id: 3,
      username,
      email,
      text,
      status: 0,
      image_path: 'https://goo.gl/VYdz95',
    });
  }

  editItem(id, { text, status }) {
    return Promise.resolve({});
  }


  login({username, password}) {
    if (username === 'admin' && password === '123') {
      return Promise.resolve(true);
    }

    return Promise.resolve(false);
  }
}

export default new Api();
