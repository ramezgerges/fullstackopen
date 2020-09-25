/* eslint react/prop-types: 0 */
//TODO props validation

import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then(response => response.data);
};

const create = newObject => {
  const request = axios.post(baseURL, newObject);
  return request.then(response => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseURL}/${id}`, newObject);
  return request.then(response => response.data);
};

const deleteObject = id => axios.delete(`${baseURL}/${id}`);

export { getAll, create, update, deleteObject };