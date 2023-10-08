import config from "../config/config";
import axios from "axios";

const getAllGroups = async () => {
  try {
    const response = await axios.get(`${config.dataGate.url}/groups`);
    return response.data;
  } catch (error) {
    return error;
  }
};

const getGroupById = async (id) => {
  try {
    const response = await axios.get(`${config.dataGate.url}/groups/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

const createGroup = async (groupData) => {
  try {
    const checUserId = await axios.get(
      `${config.dataGate.url}/users/${groupData.user_manager_id}`
    );
    if (checUserId.data.success) {
      const response = await axios.post(
        `${config.dataGate.url}/groups`,
        groupData
      );
      if (response.data.success) {
        const groupId = response.data.result.insertedId;
        await axios.post(`${config.s3Gate.url}/groups/${groupId}`, groupData);
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

const updateGroup = async (id, groupData) => {
  try {
    const { group_image, contentType, ...rest } = groupData;
    const response = await axios.put(
      `${config.dataGate.url}/groups/${id}`,
      rest
    );
    if (response.data.success && group_image) {
      await axios.delete(`${config.s3Gate.url}/groups/${id}`, {
        headers: {
          contentType: "png",
        },
      });
      await axios.delete(`${config.s3Gate.url}/groups/${id}`, {
        headers: {
          contentType: "mp4",
        },
      });
      await axios.post(`${config.s3Gate.url}/groups/${id}`, {
        group_image,
        contentType,
      });
      await axios.put(`${config.dataGate.url}/groups/${id}`, {
        group_image: `https://webappproject.s3.us-east-1.amazonaws.com/groups_bucket/${id}.${contentType}`,
      });
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
          contentType: "png",
        },
      });
      await axios.delete(`${config.s3Gate.url}/groups/${id}`, {
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
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
};
