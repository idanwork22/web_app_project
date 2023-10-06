import { ObjectId } from "mongodb";

const getAllGroups = async (db) => {
  try {
    const result = await db.collection("groups").find({}).toArray();
    return { success: true, result: result };
  } catch (error) {
    return { success: false, result: error.message };
  }
};

const getAllUserRelatedGroups = async (db, user_id) => {
  try {
    const groups = await db
      .collection("groups")
      .find({
        group_members: { $in: [user_id] },
      })
      .toArray();
    return { success: true, result: groups };
  } catch (error) {
    return { success: false, result: error.message };
  }
};

const getGroupById = async (db, id) => {
  try {
    const result = await db
      .collection("groups")
      .findOne({ _id: new ObjectId(id) });
    return result
      ? { success: true, result: result }
      : { success: false, result: "Group not found." };
  } catch (error) {
    if (
      error.message ===
      "input must be a 24 character hex string, 12 byte Uint8Array, or an integer"
    ) {
      return { success: false, result: "Invalid ID format" };
    } else {
      return { success: false, result: error.message }; // Handle other errors
    }
  }
};

const createGroup = async (db, groupData) => {
  try {
    const { user_manager_id } = groupData;
    const checkUserExists = await db
      .collection("users")
      .findOne({ _id: new ObjectId(user_manager_id) });
    if (checkUserExists) {
      const result = await db.collection("groups").insertOne(groupData);
      return { success: true, result: result };
    } else {
      return { success: false, result: "admin user doesnt exists" };
    }
  } catch (error) {
    return { success: false, result: error.message };
  }
};

const updateGroupInfo = async (db, id, groupData) => {
  try {
    const updateDoc = {
      $set: groupData,
    };
    if (Object.keys(groupData).includes("user_manager_id")) {
      const checkUserExists = await db
        .collection("users")
        .findOne({ _id: new ObjectId(groupData.user_manager_id) });
      if (!checkUserExists) {
        return { success: false, result: "admin user doesnt exists" };
      }
    }
    const result = await db
      .collection("groups")
      .updateOne({ _id: new ObjectId(id) }, updateDoc);
    if (result.matchedCount !== 0) {
      return {
        success: true,
        result: `Document with ID ${id} updated successfully`,
      };
    } else {
      return {
        success: false,
        result: `Document with ID ${id} not found`,
      };
    }
  } catch (error) {
    return { success: false, result: error.message };
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
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

const addUserToGroup = async (db, id, user_id) => {
  try {
    // Check if the group exists
    const group = await db
      .collection("groups")
      .findOne({ _id: new ObjectId(id) });
    if (!group) {
      return { success: false, result: "Group not found" };
    }

    // Check if the user exists
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(user_id) });
    if (!user) {
      return { success: false, result: "User not found" };
    }

    // Add the user to the group
    const result = await db
      .collection("groups")
      .updateOne(
        { _id: new ObjectId(id) },
        { $addToSet: { group_members: user_id } }
      );

    if (result.modifiedCount === 0) {
      return {
        success: false,
        result: "User is already a member of this group",
      };
    }

    return { success: true, result: "User added to group successfully" };
  } catch (error) {
    return { success: false, result: error.message };
  }
};

const removeUserFromGroup = async (id, user_id) => {
  // TODO
};

module.exports = {
  getAllGroups,
  removeUserFromGroup,
  addUserToGroup,
  getGroupById,
  createGroup,
  deleteGroup,
  updateGroupInfo,
  getAllUserRelatedGroups,
};
