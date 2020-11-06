import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getBlog = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);

  return response.data;
};

const update = async (id) => {
  const getResponse = await axios.get(`${baseUrl}/${id}`);
  const likes = getResponse.data.likes + 1;
  const patchResponse = await axios.patch(`${baseUrl}/${id}`, { likes });
  return patchResponse.data;
};

const commentOnBlog = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, {
    comment,
  });
  return response.data;
};

const deleteObject = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);

  return response.status;
};

export default {
  getAll,
  create,
  update,
  deleteObject,
  setToken,
  getBlog,
  commentOnBlog,
};
