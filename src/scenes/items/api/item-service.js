import axios from "axios";

const backendUrl = 'http://localhost:3001';

// export const getItems = async () => {
//   return axios.get(`${backendUrl}/items/`)
//     .then(response => {
//       return response;
//     });
// };

export const getTasks = async (queryParam) => {
  return axios.get(`${backendUrl}/task?q=${queryParam}`)
    .then(response => {
      return response;
    });
}

export const getProducts = async (setProgress) => {
  return axios.get(`${backendUrl}/product`, {
    onDownloadProgress: progressEvent => {
      let percentCompleted = Math.floor(progressEvent.loaded / progressEvent.total * 100)
      setProgress(percentCompleted);
    }
  })
    .then(response => {
      return response;
    });
}

export const getItems = async (setProgress) => {
  return axios.get(`${backendUrl}/item`, {
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

  return axios.put(`${backendUrl}/item/${updatedItem.productId}`, updatedItem, {
    onDownloadProgress: progressEvent => {
      let percentCompleted = Math.floor(progressEvent.loaded / progressEvent.total * 100)
      setProgress(percentCompleted);
    }})
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log('error ------------------->> ', err);
      return err;
    });
}

export const createItem = async (item) => {

  return axios.post(`${backendUrl}/items/`, item)
    .then(response => {
      return response;
    });
}
