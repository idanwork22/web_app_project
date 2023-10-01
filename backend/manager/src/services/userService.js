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

const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${config.dataGate.url}/users/${id}`, userData)
    return response.data;
  } catch (error) {
    return error;
  }
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
