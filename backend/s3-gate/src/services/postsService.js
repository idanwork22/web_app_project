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

const getPostById = (id) => 
posts.find((post) => post.id === parseInt(id));

const createPost = (userData) => {
  const id = posts.length + 1;
  const newPost = { id, ...userData };
  newPost.data && posts.push(newPost);
  return newPost.data ? newPost : `Plesae enter "data" in body`;
};

const updatePost = (id, userData) => {
  id = parseInt(id);
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex !== -1) {
    posts[postIndex] = { ...posts[postIndex], ...userData };
    return posts[postIndex];
  }

  return null;
};

const deletePost = (id) => {
  id = parseInt(id);
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex !== -1) {
    const deletedPost = posts.splice(postIndex, 1);
    return deletedPost[0];
  }

  return null;
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
