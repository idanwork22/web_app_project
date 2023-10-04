import { ObjectId } from "mongodb";

const getAllUsers = async (db) => {
  try {
    const result = await db.collection("users").find({}).toArray();
    return result;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const getUserById = async (db, id) => {
  try {
    const result = await db.collection("users").findOne({ _id: new ObjectId(id) });
    return result || { success: false, message: "User not found." };
  } catch (error) {
    if (error.message === "input must be a 24 character hex string, 12 byte Uint8Array, or an integer") {
      return { success: false, message: "Invalid ID format" };
    } else {
      return { success: false, message: error.message }; // Handle other errors
    }
  }
};

const createUser = (userData) => {
  const id = users.length + 1;
  const newUser = { id, ...userData };
  users.push(newUser);
  return newUser;
};

const updateUser = (id, userData) => {
  id = parseInt(id);
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...userData };
    return users[userIndex];
  }

  return { success: false, message: "User not found." };
};

const deleteUser = (id) => {
  id = parseInt(id);
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    return deletedUser[0];
  }

  return { success: false, message: "User not found." };
};

// return True / False
const isUserExist = (username, password) =>
  !!users.find(
    (user) => user.username === username && user.password === password
  );

const getUserIdByUsername = async (db, username) => {
  try {
    const result = await db.collection("users").findOne({ username: username });
    return result || { success: false, message: "User not found." };
  } catch (error) {
      return { success: false, message: error.message }; // Handle other errors
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
