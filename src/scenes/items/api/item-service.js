import axios from "axios";

const backendUrl = 'http://localhost:3001/';

export const getItems = async () => {
  return axios.get(`${backendUrl}/items/`)
    .then(response => {
      return response;
    });
};

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
