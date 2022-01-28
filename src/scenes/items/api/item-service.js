import axios from "axios";

const backendUrl = 'http://localhost:3001';

export const getItems = async () => {
  return axios.get(`${backendUrl}/items/`)
    .then(response => {
      return response;
    });
};

export const getQuestions = async (setProgress) => {
  return axios.get(`${backendUrl}/question`, {
    onDownloadProgress: progressEvent => {
      let percentCompleted = Math.floor(progressEvent.loaded / progressEvent.total * 100)
      setProgress(percentCompleted);
    }
  })
    .then(response => {
      return response;
    });
}

export const getQuestion = async (id, setProgress) => {
  return axios.get(`${backendUrl}/question/${id}`, {
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

export const updateItems = async (updatedItem) => {

  return axios.put(`${backendUrl}/items/`, updatedItem)
    .then(response => {
      return response;
    });
}

export const sendAnswers = async (answers, setProgress) => {

  return axios.post(`${backendUrl}/answer`, answers, {
    onDownloadProgress: progressEvent => {
      let percentCompleted = Math.floor(progressEvent.loaded / progressEvent.total * 100)
      setProgress(percentCompleted);
    }
  })
    .then(response => {
      return response;
    });
}
