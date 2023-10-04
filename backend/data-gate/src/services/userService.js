import { ObjectId } from "mongodb";
import { getTimestamp } from "../utils/getTimeStamp";

const getAllUsers = async (db) => {
  try {
    const result = await db.collection("users").find({}).toArray();
    return { success: true, result: result };
  } catch (error) {
    return { success: false, result: error.message };
  }
};

const getUserById = async (db, id) => {
  try {
    const result = await db
      .collection("users")
      .findOne({ _id: new ObjectId(id) });
    return result
      ? { success: true, result: result }
      : { success: false, result: "User not found." };
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

const createUser = async (db, userData) => {
  try {
    userData = {
      ...userData,
      user_creation_time: new Date(getTimestamp()),
      friends: [],
      is_online: true,
    };
    const checkUsername = await getUserIdByUsername(db, userData.username);
    if (
      "result" in checkUsername &&
      checkUsername.result === "User not found."
    ) {
      const result = await db.collection("users").insertOne(userData);
      return { success: true, result: result };
    } else {
      return { success: false, result: "username already exists" };
    }
  } catch (error) {
    return { success: false, result: error.message };
  }
};

const updateUser = (id, userData) => {
  id = parseInt(id);
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...userData };
    return { success: true, result: users[userIndex] };
  }

  return { success: false, result: "User not found." };
};

const deleteUser = async (db, id) => {
  try {
    const result = await db
      .collection("users")
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

// return True / False
const isUserExist = async (db, username, password) => {
  try {
    const result = await db
      .collection("users")
      .findOne({ username: username, password: password });
    return { success: !!result, result: !!result };
  } catch (error) {
    return { success: false, result: error.message };
  }
};

const getUserIdByUsername = async (db, username) => {
  try {
    const result = await db.collection("users").findOne({ username: username });
    return result
      ? { success: true, result: result }
      : { success: false, result: "User not found." };
  } catch (error) {
    return { success: false, result: error.message };
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  isUserExist,
  getUserIdByUsername,
};
