import config from "../config/config";

const params = {
  Bucket: config.s3Browser.bucket,
  Prefix: "posts_bucket/",
};

const getAllPosts = async (s3) => {
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

const getPostById = async (s3, id, contentType) => {
  try {
    const key = `${params.Prefix}${id}.${contentType}`;
    const data = await s3
      .getObject({ Bucket: params.Bucket, Key: key })
      .promise();
    return { success: true, result: `${config.s3Browser.previewUrl}/${key}` };
  } catch (error) {
    return { success: false, result: error.message };
  }
};

const createPost = async (s3, id, { post_image, contentType }) => {
  try {
    const fileContent = Buffer.from(post_image, "base64");
    const newPost = {
      Bucket: params.Bucket,
      Key: `${params.Prefix}${id}.${contentType}`,
      Body: fileContent,
      ContentType: contentType,
    };
    await s3.upload(newPost).promise();
    return {
      success: true,
      result: `File uploaded successfully - ${id}.${contentType}`,
    };
  } catch (error) {
    return { success: false, result: error.message };
  }
};

const updatePost = async (s3, id, { post_image, contentType }) => {
  try {
    // Step 1: Check if the object exists
    try {
      await s3
        .headObject({ Bucket: params.Bucket, Key: `${params.Prefix}${id}.${contentType}` })
        .promise();
    } catch (err) {
      if (err.code === "NotFound") {
        return { success: false, result: `File with id ${id}.${contentType} not found.` };
      } else {
        throw err; // Re-throw other errors
      }
    }

    // Step 2: Download the file
    const fileContent = Buffer.from(post_image, "base64");
    const newPhoto = {
      Bucket: params.Bucket,
      Key: `${params.Prefix}${id}.${contentType}`,
      Body: fileContent,
      ContentType: contentType, // Set the content type appropriately
    };

    // Step 3: Upload the updated file
    await s3.upload(newPhoto).promise();

    return {
      success: true,
      result: `File updated successfully - ${id}.${contentType}`,
    };
  } catch (error) {
    return { success: false, result: error.message };
  }
};

const deletePost = async (s3, id, contentType) => {
  try {
    const toDelete = {
      Bucket: params.Bucket,
      Key: `${params.Prefix}${id}.${contentType}`
    };
    await s3.deleteObject(toDelete).promise();
    return { success: true, result: 'File deleted successfully' };
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
