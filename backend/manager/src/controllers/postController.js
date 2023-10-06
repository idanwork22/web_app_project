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
  if (req.body.contentType !== "mp4" && req.body.contentType !== "png") {
    res.json({
      success: false,
      result:
        "Incomplete post data provided, please enter contentType(png/mp4)",
    });
  } else {
    const newPost = await postService.createPost(req.body);
    res.json(newPost);
  }
};

const updatePost = async (req, res) => {
  if (
    req.body.post_image &&
    req.body.contentType != "mp4" &&
    req.body.contentType != "png"
  ) {
    res.json({
      success: false,
      result:
        "Incomplete post data provided, please enter contentType(png/mp4)",
    });
  } else {
    const updatedPost = await postService.updatePost(req.params.id, req.body);
    res.json(updatedPost);
  }
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
