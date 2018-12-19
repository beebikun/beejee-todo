import axios from 'axios';
import md5 from 'js-md5';

const PER_PAGE = 3;
const BASE_URL = 'https://uxcandy.com/~shapoval/test-task-backend/';
const NAME = 'beebikun';

function getData({ data }) {
  if (data.status === 'ok') {
    return data.message;
  } else {
    return Promise.reject();
  }
}

const POST_CONFIG = {
  params: { developer: NAME },
  crossDomain: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
  },
};

class Api {
  fetchItems({ page, sortField, sortDirection }) {
    const params = {
      page,
      developer: NAME,
      sort_field: sortField,
      sort_direction: sortDirection,
    };
    return axios.get(BASE_URL, { params })
      .then(getData)
      .then(({ tasks, total_task_count }) => {
        const pagesCount = Math.ceil(total_task_count / PER_PAGE);
        return { tasks, pagesCount, total: total_task_count };
      });
  }

  addItem({ username, email, text, image }) {
    const form = new FormData();
    form.append('username', username);
    form.append('email', email);
    form.append('text', text);
    form.append('image', image, image.name);

    return axios
      .post(BASE_URL + 'create/', form, POST_CONFIG)
      .then(getData)
      .then((task) => task);
  }

  editItem(task) {
    const { id, text, status } = task;
    const params = {
      status, text,
      token: 'beejee',
    };
    const query = Object.keys(params).reduce((s, key) => {
      const value = encodeURIComponent(params[key]);
      return s += `${key}=${value}&`;
    }, '').slice(0, -1);  // cut the trailing `&`
    const signature = md5(query);

    const form = new FormData();
    form.append('status', status);
    form.append('text', text);
    form.append('token', 'beejee');
    form.append('signature', signature);

    return axios
      .post(BASE_URL + 'edit/' + id, form, POST_CONFIG)
      .then(getData)
      .then(() => task);
  }


  login({username, password}) {
    if (username === 'admin' && password === '123') {
      return Promise.resolve(true);
    }

    return Promise.resolve(false);
  }
}

export default new Api();
