import config from "../config/config";
import axios from "axios";

const getAllGroups = async () => {
  try {
    const response = await axios.get(`${config.dataGate.url}/posts`);
    return response.data;
  } catch (error) {
    return error;
  }
};
const getAllUserRelatedGroups = async (id, user_id) => {
  try {
    const response = await axios.get(`${config.dataGate.url}/posts/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

const getGroupById = async (id) => {
  try {
    const response = await axios.get(`${config.dataGate.url}/posts/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

const createGroup = async (postData) => {
  try {
    const checUserId = await axios.get(
      `${config.dataGate.url}/users/${postData.user_creator_id}`
    );
    if (checUserId.data.success) {
      const response = await axios.post(
        `${config.dataGate.url}/groups`,
        postData
      );
      if (response.data.success) {
        const groupId = response.data.result.insertedId;
        await axios.post(`${config.s3Gate.url}/groups/${groupId}`, postData);
        await axios.put(`${config.dataGate.url}/groups/${groupId}`, {
          group_image: `https://webappproject.s3.us-east-1.amazonaws.com/groups_bucket/${groupId}.png`,
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

const updateGroupInfo = async (id, groupData) => {
  try {
    const { axios, ...rest } = groupData;
    const response = await axios.put(
      `${config.dataGate.url}/groups/${id}`,
      rest
    );
    if (response.data.success && axios) {
      console.log("change image in s3");
      //await axios.put(`${config.s3Gate.url}/posts/${id}/photo`, {post_image});
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

const deleteGroup = async (id) => {
  try {
    const response = await axios.delete(`${config.dataGate.url}/groups/${id}`);
    if (response.data.success) {
      await axios.delete(`${config.s3Gate.url}/groups/${id}`, {
        headers: {
          'contentType': "png",
        },
      });
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

const addUserToGroup = async (id, user_id) => {
  try {
    const response = await axios.delete(`${config.dataGate.url}/posts/${id}`);
    if (response.data.success) {
      await axios.delete(`${config.s3Gate.url}/posts/${id}`, {
        headers: {
          'contentType': "png",
        },
      });
      await axios.delete(`${config.s3Gate.url}/posts/${id}`, {
        headers: {
          'contentType': "mp4",
        },
      });
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

const removeUserFromGroup = async (id, user_id) => {
  try {
    const response = await axios.delete(`${config.dataGate.url}/posts/${id}`);
    if (response.data.success) {
      await axios.delete(`${config.s3Gate.url}/posts/${id}`, {
        headers: {
          'contentType': "png",
        },
      });
      await axios.delete(`${config.s3Gate.url}/posts/${id}`, {
        headers: {
          'contentType': "mp4",
        },
      });
    }
    return response.data;
  } catch (error) {
    return error;
  }
};
module.exports = {
  getAllGroups,
  removeUserFromGroup,
  addUserToGroup,
  getGroupById,
  createGroup,
  deleteGroup,
  updateGroupInfo,
  getAllUserRelatedGroups
};
