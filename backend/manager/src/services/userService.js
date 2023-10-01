import config from "../config/config";
import axios from "axios";

const getAllUsers = async () =>{
  try {
    const response = await axios.get(`${config.dataGate.url}/users`);
    return response.data;
  } catch (error) {
    return error;
  }
} 

const getUserById = async (id) => {
  try {
    const response = await axios.get(`${config.dataGate.url}/users/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
}

const createUser = async (userData) => {
  try {
    const response = await axios.post(`${config.dataGate.url}/users`, userData)
    return response.data;
  } catch (error) {
    return error;
  }
};

const updateUser = (id, userData) => {
  id = parseInt(id);
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...userData };
    return users[userIndex];
  }

  return null;
};

const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${config.dataGate.url}/users/${id}`)
    return response.data;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
