import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const getAll = async () => {
  const request = await axios.get(`${baseUrl}/api/persons`);
  console.log("Response: ", request.data);
  return request.data;
};

const create = async (newObject) => {
  console.log(newObject);
  const response = await axios.post(`${baseUrl}/api/persons`, newObject);
  return response.data;
};

const update = async (id, newObject) => {
  console.log(id);
  console.log(newObject);
  const response = await axios.put(`${baseUrl}/api/persons/${id}`, newObject);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/api/persons/${id}`);
  return response.data;
};

export default { getAll, create, update, remove };
