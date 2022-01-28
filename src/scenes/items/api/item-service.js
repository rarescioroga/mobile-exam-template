import axios from "axios";

const backendUrl = 'http://localhost:3001';
export const webSocketUrl = 'ws://localhost:3001';

export const answerQuestion = async (questionData, setProgress) => {
  return axios.post(`${backendUrl}/answer`, questionData, {
    onDownloadProgress: progressEvent => {
      let percentCompleted = Math.floor(progressEvent.loaded / progressEvent.total * 100)
      setProgress(percentCompleted);
    }
  }).then(response => {
    return response;
  });
}

export const getItems = async () => {
  return axios.get(`${backendUrl}/items/`)
    .then(response => {
      return response;
    });
};

export const getTasks = async (queryParam) => {
  return axios.get(`${backendUrl}/task?q=${queryParam}`)
    .then(response => {
      return response;
    });
}

export const updateItems = async (updatedItem) => {

  return axios.put(`${backendUrl}/items/`, updatedItem)
    .then(response => {
      return response;
    });
}

export const createItem = async (item) => {

  return axios.post(`${backendUrl}/items/`, item)
    .then(response => {
      return response;
    });
}
