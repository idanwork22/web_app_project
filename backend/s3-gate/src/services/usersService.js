import config from "../config/config";

const params = {
  Bucket: config.s3Browser.bucket,
  Prefix: "users_bucket/",
};

const getAllUsersPhotos = async (s3) => {
  try {
    const data = await s3.listObjectsV2(params).promise();
    const files = data.Contents.filter((item) => item.key !== "users_bucket/").map(
      (item) => `${config.s3Browser.previewUrl}/${item.Key}`
    );
    return { success: true, result: files };
  } catch (error) {
    return { success: false, result: error.message };
  }
};

const getUserPhoto = (id) => {
  id = parseInt(id);
  const userIndex = users.findIndex((user) => user.id === id);
  return userIndex !== -1
    ? users[userIndex].user_profile_image
    : { success: false, message: "User not found." };
};

const createUserPhoto = (id, user_profile_image) => {
  id = parseInt(id);
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    const newUser = { id, user_profile_image };
    users.push(newUser);
    return newUser;
  }

  return { success: false, message: "User already exists." };
};

const updateUserPhoto = (id, user_profile_image) => {
  id = parseInt(id);
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], user_profile_image };
    return users[userIndex];
  }

  return { success: false, message: "User not found." };
};

const deleteUserPhoto = (id) => {
  id = parseInt(id);
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    users[userIndex].user_profile_image = "";
    return users[userIndex];
  }

  return { success: false, message: "User not found." };
};

module.exports = {
  getAllUsersPhotos,
  getUserPhoto,
  createUserPhoto,
  updateUserPhoto,
  deleteUserPhoto,
};
