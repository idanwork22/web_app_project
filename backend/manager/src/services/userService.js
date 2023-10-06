import config from "../config/config";
import axios from "axios";

const getAllUsers = async () => {
  try {
    const response = await axios.get(`${config.dataGate.url}/users`);
    return response.data;
  } catch (error) {
    return error;
  }
};

const getUserById = async (id) => {
  try {
    const response = await axios.get(`${config.dataGate.url}/users/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

const getUserByUsername = async (username) => {
  try {
    const response = await axios.get(`${config.dataGate.url}/users/username/${username}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

const createUser = async (userData) => {
  try {
    const response = await axios.post(`${config.dataGate.url}/users`, userData);
    if (response.data.success) {
      const userId = response.data.result.insertedId;
      await axios.post(`${config.s3Gate.url}/users/${userId}/photo`, userData);
      await axios.put(`${config.dataGate.url}/users/${userId}`, {
        user_profile_image: `https://webappproject.s3.us-east-1.amazonaws.com/users_bucket/${userId}.png`,
      });
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

const updateUser = async (id, userData) => {
  try {
    const {user_profile_image, ...rest} = userData
    const response = await axios.put(
      `${config.dataGate.url}/users/${id}`,
      rest
    );
    if (response.status && user_profile_image){
      await axios.put(
        `${config.s3Gate.url}/users/${id}/photo`,
        userData
      );
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

// TODO: also deleting each post he creates, every chat he connect to and every group he member of
const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${config.dataGate.url}/users/${id}`);
    if (response.data.success){
      await axios.delete(`${config.s3Gate.url}/users/${id}/photo`);
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

const isUserExist = async (userData) => {
  try {
    const response = await axios.post(
      `${config.dataGate.url}/users/login`,
      userData
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
  isUserExist,
};
