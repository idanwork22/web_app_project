import postService from "../services/postService";

const getAllPosts = (db) => async (req, res) => {
  const data = await postService.getAllPosts(db);
  res.json(data);
};

const getPostById = (db) => async (req, res) => {
  const id = req.params.id;
  const data = await postService.getPostById(db, id);
  res.json(data);
};

const createPost = (db) => async (req, res) => {
  const postData = {
    user_creator_id: req.body.user_creator_id,
    post_content: req.body.post_content,
    post_image: req.body.post_image,
  };

  const isAllDataAvailable = Object.values(postData).every(Boolean);
  res.json(
    isAllDataAvailable
      ? await postService.createPost(db, postData)
      : { success: false, result: "Incomplete post data provided." }
  );
};

const updatePost = (db) => async (req, res) => {
  const id = req.params.id;
  const postData = {
    postname: req.body.postname,
  };

  const filteredPostData = Object.keys(postData).reduce((acc, key) => {
    if (postData[key] !== undefined) {
      acc[key] = postData[key];
    }
    return acc;
  }, {});

  res.json(await postService.updatePost(db, id, filteredPostData));
};

const deletePost = (db) => async (req, res) => {
  const id = req.params.id;
  const deletedPost = await postService.deletePost(db, id);
  res.json(deletedPost);
};


module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
