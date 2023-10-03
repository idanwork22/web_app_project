const posts = [
  { id: 1, data: "Yoav POST"},
  { id: 2, data: "Idan POST"},
  { id: 3, data: "Omer POST"},
  { id: 4, data: "Raz POST"},
];

const getAllPosts = () => posts;

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
