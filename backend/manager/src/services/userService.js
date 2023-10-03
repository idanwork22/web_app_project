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

// TODO: delete user from user's collection based on user_id ,
// TODO: also deleting each post he creates, every chat he connect to and every group he member of
const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${config.dataGate.url}/users/${id}`)
    return response.data;
  } catch (error) {
    return error;
  }
};

const isUserExist = async (userData) => {
  try {
    const response = await axios.post(`${config.dataGate.url}/users/login`, userData)
    return response.data;
  } catch (error) {
    return error;
  }
}


module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  isUserExist,
};
