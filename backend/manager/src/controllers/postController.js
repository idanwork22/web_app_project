import postService from "../services/postService";

const getAllPosts = async (req, res) => {
  const data = await postService.getAllPosts();
  res.json(data);
};

const getPostById = async (req, res) => {
  const data = await postService.getPostById(req.params.id);
  res.json(data);
};

const createPost = async (req, res) => {
  const newPost = await postService.createPost(req.body);
  res.json(newPost);
};

const updatePost = async (req, res) => {
  const updatedPost = await postService.updatePost(req.params.id, req.body);
  res.json(updatedPost);
};

const deletePost = async (req, res) => {
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
