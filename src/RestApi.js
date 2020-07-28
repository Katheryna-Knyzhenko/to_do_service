const axios = require('axios');
const widgetId = 19951103;
const maxCountTasks = 30;

export function createTask(title) {
  return axios.post(`https://repetitora.net/api/JS/Tasks`, {
    widgetId,
    title
  });
}

export function getTasks() {
  return axios.get(`https://repetitora.net/api/JS/Tasks?widgetId=${widgetId}&count=${maxCountTasks}`);

}

export function updateTask(taskId, status) {
  return axios.put(`https://repetitora.net/api/JS/Tasks`, {
    widgetId,
    taskId,
    done: status,
  });
}

export function deleteTask (id) {
    return axios.delete(`https://repetitora.net/api/JS/Tasks?widgetId=${widgetId}&taskId=${id}`
    );
}
