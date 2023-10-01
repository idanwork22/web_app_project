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

const createUser = (userData) => {
  const id = users.length + 1;
  const newUser = { id, ...userData };
  newUser.name && users.push(newUser);
  return newUser.name ? newUser : `Plesae enter "name" in body`;
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

const deleteUser = (id) => {
  id = parseInt(id);
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    return deletedUser[0];
  }

  return null;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
