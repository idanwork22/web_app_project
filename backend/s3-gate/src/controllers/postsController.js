import postsService from "../services/postsService";

const getAllPosts = (req, res) => {
  const data = postsService.getAllPosts();
  res.json(data);
};

const getPostById = (req, res) => {
  const id = req.params.id;
  const data = postsService.getPostById(id);
  res.json(data ? data : 'NotFound');
};

const createPost = (req, res) => {
  const data = req.body.data;
  const newPost = postsService.createPost({data});
  res.json(newPost);
};

const updatePost = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const updatedPost = postsService.updatePost(id, data);
  res.json(updatedPost);
};

const deletePost = (req, res) => {
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
