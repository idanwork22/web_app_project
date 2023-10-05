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

// TODO: add user image to s3
const createUser = async (userData) => {
  try {
    const response = await axios.post(`${config.dataGate.url}/users`, userData);
    if (response.data.success) {
      const userId = response.data.result.insertedId;
      //post to s3
      const s3Response = await axios.put(
        `${config.dataGate.url}/users/${userId}`,
        {
          user_profile_image: `https://webappproject.s3.us-east-1.amazonaws.com/users_bucket/${userId}.png`,
        }
      );
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

// TODO: if we change user image need to upload to s3
const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(
      `${config.dataGate.url}/users/${id}`,
      userData
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// TODO: delete user from user's collection based on user_id ,
// TODO: also deleting each post he creates, every chat he connect to and every group he member of
const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${config.dataGate.url}/users/${id}`);
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
  createUser,
  updateUser,
  deleteUser,
  isUserExist,
};
