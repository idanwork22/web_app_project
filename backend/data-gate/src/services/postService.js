import { ObjectId } from "mongodb";
import { getTimestamp } from "../utils/getTimeStamp";

const getAllPosts = async (db) => {
  try {
    const result = await db.collection("posts").find({}).toArray();
    return { success: true, result: result };
  } catch (error) {
    return { success: false, result: error.message };
  }
};

const getPostById = async (db, id) => {
  try {
    const result = await db
      .collection("posts")
      .findOne({ _id: new ObjectId(id) });
    return result
      ? { success: true, result: result }
      : { success: false, result: "Post not found." };
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

const createPost = async (db, postData) => {
  try {
    postData = {
      ...postData,
      post_creation_time: new Date(getTimestamp()),
      friends: [],
      is_online: true,
    };

    const result = await db.collection("posts").insertOne(postData);
    return { success: true, result: result };
  } catch (error) {
    return { success: false, result: error.message };
  }
};

const updatePost = async (db, id, postData) => {
  try {
    const updateDoc = {
      $set: postData,
    };

    const result = await db
      .collection("posts")
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

const deletePost = async (db, id) => {
  try {
    const result = await db
      .collection("posts")
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

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
