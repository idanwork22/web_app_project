import config from "../config/config";

const params = {
  Bucket: config.s3Browser.bucket,
  Prefix: "users_bucket/",
};

const getAllUsersPhotos = async (s3) => {
  try {
    const data = await s3.listObjectsV2(params).promise();
    const files = data.Contents.map(
      (item) => `${config.s3Browser.previewUrl}/${item.Key}`
    );
    return { success: true, result: files };
  } catch (error) {
    return { success: false, result: error.message };
  }
};

const getUserPhoto = async (s3, id) => {
  try {
    const key = `${params.Prefix}${id}.png`;
    const data = await s3
      .getObject({ Bucket: params.Bucket, Key: key })
      .promise();
    return { success: true, result: data.Body };
  } catch (error) {
    return { success: false, result: error.message };
  }
};

const createUserPhoto = async (s3, id, user_profile_image) => {
  try {
    try {
      // Check if file with the same id already exists
      await s3
        .headObject({ Bucket: params.Bucket, Key: `${params.Prefix}${id}.png` })
        .promise();
      return { success: false, result: `File with id ${id} already exists` };
    } catch (error) {
      const fileContent = Buffer.from(user_profile_image, "base64");
      const newUser = {
        Bucket: params.Bucket,
        Key: `${params.Prefix}${id}.png`,
        Body: fileContent,
        ContentType: "png", // Set the content type appropriately
      };
      await s3.upload(newUser).promise();
      return {
        success: true,
        result: `File uploaded successfully - ${id}.png`,
      };
    }
  } catch (error) {
    return { success: false, result: error.message };
  }
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
