import postService from "../services/postService";

const getAllGroups = async (req, res) => {
  const data = await postService.getAllPosts();
  res.json(data);
};

const getAllUserRelatedGroups = async (req, res) => {
  const data = await postService.getAllPosts();
  res.json(data);
};

const getGroupById = async (req, res) => {
  const data = await postService.getPostById(req.params.id);
  res.json(data);
};

const createGroup = async (req, res) => {
  const newPost = await postService.createPost(req.body);
  res.json(newPost);
};

const updateGroupInfo = async (req, res) => {
  const updatedPost = await postService.updatePost(req.params.id, req.body);
  res.json(updatedPost);
};

const addUserToGroup = async (req, res) => {
  const deletedPost = await postService.deletePost(req.params.id);
  res.json(deletedPost);
};

const removeUserFromGroup = async (req, res) => {
  const deletedPost = await postService.deletePost(req.params.id);
  res.json(deletedPost);
};

const deleteGroup = async (req, res) => {
  const deletedPost = await postService.deletePost(req.params.id);
  res.json(deletedPost);
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
