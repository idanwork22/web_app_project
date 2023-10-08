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

const deleteGroup = async (db, id) => {
  try {
    const result = await db
      .collection("groups")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount !== 0) {
      return {
        success: true,
        result: `Document with ID ${id} deleted successfully`,
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

const removeUserFromGroup = async (db, id, user_id) => {
  try {
    // Check if the group exists
    const group = await db
      .collection("groups")
      .findOne({ _id: new ObjectId(id) });
    if (!group) {
      return { success: false, result: "Group not found" };
    }

    // Check if the user is a member of the group
    if (!group.group_members.includes(user_id)) {
      return { success: false, result: 'User is not a member of this group' };
    }

    // Remove the user from the group
    const result = await db.collection('groups').updateOne(
      { _id: new ObjectId(id) },
      { $pull: { group_members: user_id } }
    );

    if (result.modifiedCount === 0) {
      return {
        success: false,
        result: "User is already removed from this group",
      };
    }

    return { success: true, result: "User removed from group successfully" };
  } catch (error) {
    return { success: false, result: error.message };
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
  getAllUserRelatedGroups,
};
