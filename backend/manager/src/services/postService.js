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

const createPost = async (postData) => {
  try {
    const checUserId = await axios.get(
      `${config.dataGate.url}/users/${postData.user_creator_id}`
    );
    if (checUserId.data.success) {
      const response = await axios.post(
        `${config.dataGate.url}/posts`,
        postData
      );
      if (response.data.success) {
        const postId = response.data.result.insertedId;
        await axios.post(`${config.s3Gate.url}/posts/${postId}`, postData);
        await axios.put(`${config.dataGate.url}/posts/${postId}`, {
          post_image: `https://webappproject.s3.us-east-1.amazonaws.com/posts_bucket/${postId}.${postData.contentType}`,
        });
      }
      return response.data;
    } else {
      return checUserId.data;
    }
  } catch (error) {
    return error;
  }
};

const updatePost = async (id, postData) => {
  try {
    const { post_image, contentType, ...rest } = postData;
    const response = await axios.put(
      `${config.dataGate.url}/posts/${id}`,
      rest
    );
    if (response.data.success && post_image) {
      await axios.delete(`${config.s3Gate.url}/posts/${id}`, {
        headers: {
          contentType: "png",
        },
      });
      await axios.delete(`${config.s3Gate.url}/posts/${id}`, {
        headers: {
          contentType: "mp4",
        },
      });
      await axios.post(`${config.s3Gate.url}/posts/${id}`, {
        post_image,
        contentType,
      });
      await axios.put(`${config.dataGate.url}/posts/${id}`, {
        post_image: `https://webappproject.s3.us-east-1.amazonaws.com/posts_bucket/${id}.${contentType}`,
      });
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${config.dataGate.url}/posts/${id}`);
    if (response.data.success) {
      await axios.delete(`${config.s3Gate.url}/posts/${id}`, {
        headers: {
          contentType: "png",
        },
      });
      await axios.delete(`${config.s3Gate.url}/posts/${id}`, {
        headers: {
          contentType: "mp4",
        },
      });
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
