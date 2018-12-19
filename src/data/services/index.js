const perPage = 3;
const BASE_URL = '';

class Api {
  fetchItems({ page, sortField, sortDirection }) {
    const ids = [];
    while(ids.length != 3) {
      const id = Math.round(Math.random() * 100);
      if (ids.includes(id) === false) {
        ids.push(id);
      }
    }

    const tasks = [
      {
        id: ids[0],
        username: 'Finn',
        email: 'finn.humat@at.com',
        text: 'Save the princess',
        status: 10,
        image_path: 'https://goo.gl/61pq8a',
      },
      {
        id: ids[1],
        username: 'Dipper',
        email: 'dipper.pines@gf.com',
        text: 'Solve the secret',
        status: 0,
        image_path: 'https://goo.gl/TDDqFT',
      },
      {
        id: ids[2],
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

  editItem(task) {
    // const { id,  }
    return Promise.resolve(task);
  }


  login({username, password}) {
    if (username === 'admin' && password === '123') {
      return Promise.resolve(true);
    }

    return Promise.resolve(false);
  }
}

export default new Api();
