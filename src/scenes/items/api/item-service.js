import axios from "axios";

const backendUrl = 'http://localhost:3001';

export const getItems = async () => {
  return axios.get(`${backendUrl}/items/`)
    .then(response => {
      return response;
    });
};

export const getTasks = async (queryParam, setProgress) => {
  return axios.get(`${backendUrl}/task?q=${queryParam}`, {
    onDownloadProgress: progressEvent => {
      let percentCompleted = Math.floor(progressEvent.loaded / progressEvent.total * 100)
      setProgress(percentCompleted);
    }
  })
    .then(response => {
      return response;
    });
}

export const getSpaces = async (setProgress) => {
  return axios.get(`${backendUrl}/space`, {
    onDownloadProgress: progressEvent => {
      let percentCompleted = Math.floor(progressEvent.loaded / progressEvent.total * 100)
      setProgress(percentCompleted);
    }
  })
    .then(response => {
      return response;
    });
}

export const updateItem = async (updatedItem, setProgress) => {
  return axios.put(`${backendUrl}/space/${updatedItem.id}`, updatedItem, {
    onDownloadProgress: progressEvent => {
      let percentCompleted = Math.floor(progressEvent.loaded / progressEvent.total * 100)
      setProgress(percentCompleted);
    }
  })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
}

export const createItem = async (item) => {

  return axios.post(`${backendUrl}/items/`, item)
    .then(response => {
      return response;
    });
}
