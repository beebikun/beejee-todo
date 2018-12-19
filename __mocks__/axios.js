
function getTasks() {
  const ids = [];
  while(ids.length != 3) {
    const id = Math.round(Math.random() * 100);
    if (ids.includes(id) === false) {
      ids.push(id);
    }
  }
  return [
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
}
export const tasks = getTasks();
export const task = tasks[0];
export const total_task_count = 10;

const axios = jest.fn();
axios.get = jest.fn(() => Promise.resolve({
  data: {status: 'ok', message: { tasks: getTasks(), total_task_count, } }
}));
axios.post = jest.fn(() => Promise.resolve({
  data: { status: 'ok', message: task }
}));


export default axios;
