import postsService from "../services/postsService";

const getAllPosts = (s3) => async (req, res) => {
  const data = await postsService.getAllPosts(s3);
  res.json(data);
};

const getPostById = (s3) => async (req, res) => {
  const id = req.params.id;
  const contentType = req.body.contentType;
  if (contentType === "png" || contentType === "mp4") {
    const data = await postsService.getPostById(s3, id, contentType);
    res.json(data);
  } else {
    res.json({
      success: false,
      result:
        "Incomplete get post data provided, please enter contentType(png/mp4)",
    });
  }
};

const createPost = (s3) => async (req, res) => {
  const id = req.params.id;
  const postData = {
    post_image: req.body.post_image,
    contentType: req.body.contentType,
  };
  const isAllDataAvailable = Object.values(postData).every(Boolean);

  if (postData.contentType === "png" || postData.contentType === "mp4") {
    res.json(
      isAllDataAvailable
        ? await postsService.createPost(s3, id, postData)
        : { success: false, result: "Incomplete post data provided." }
    );
  } else {
    res.json({
      success: false,
      result:
        "Incomplete post data provided, please enter contentType(png/mp4)",
    });
  }
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
