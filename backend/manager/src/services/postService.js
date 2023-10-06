import config from "../config/config";
import axios from "axios";

const getAllPosts = async () => {
  try {
    const response = await axios.get(`${config.dataGate.url}/posts`);
    return response.data;
  } catch (error) {
    return error;
  }
};

const getPostById = async (id) => {
  try {
    const response = await axios.get(`${config.dataGate.url}/posts/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

// TODO: check if user_creator_id
const createPost = async (postData) => {
  try {
    const response = await axios.post(`${config.dataGate.url}/posts`, postData);
    if (response.data.success) {
      const postId = response.data.result.insertedId;
      await axios.post(`${config.s3Gate.url}/posts/${postId}/photo`, postData);
      await axios.put(`${config.dataGate.url}/posts/${postId}`, {
        post_profile_image: `https://webappproject.s3.us-east-1.amazonaws.com/posts_bucket/${postId}.png`,
      });
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

const updatePost = async (id, postData) => {
  try {
    const {post_profile_image, ...rest} = postData
    const response = await axios.put(
      `${config.dataGate.url}/posts/${id}`,
      rest
    );
    if (response.status && post_profile_image){
      await axios.put(
        `${config.s3Gate.url}/posts/${id}/photo`,
        postData
      );
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

// TODO: also deleting each post he creates, every chat he connect to and every group he member of
const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${config.dataGate.url}/posts/${id}`);
    if (response.data.success){
      await axios.delete(`${config.s3Gate.url}/posts/${id}/photo`);
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
