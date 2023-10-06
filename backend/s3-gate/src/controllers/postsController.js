import postsService from "../services/postsService";

const getAllPosts = (s3) => async (req, res) => {
  const data = await postsService.getAllPosts(s3);
  res.json(data);
};

const getPostById = (s3) => async (req, res) => {
  const id = req.params.id;
  const data = postsService.getPostById(id);
  res.json(data ? data : 'NotFound');
};

const createPost = (s3) => async (req, res) => {
  const data = req.body.data;
  const newPost = postsService.createPost({data});
  res.json(newPost);
};

const updatePost = (s3) => async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const updatedPost = postsService.updatePost(id, data);
  res.json(updatedPost);
};

const deletePost = (s3) => async (req, res) => {
  const id = req.params.id;
  const deletedPost = postsService.deletePost(id);
  res.json(deletedPost);
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
