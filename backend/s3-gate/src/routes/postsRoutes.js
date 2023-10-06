import express from "express";
import postsController from "../controllers/postsController";

const postRoutes = (s3) => {
  const router = express.Router();

  router.get("/", postsController.getAllPosts(s3));
  router.get("/:id", postsController.getPostById(s3));
  router.post("/:id", postsController.createPost(s3));
  router.put("/:id", postsController.updatePost(s3));
  router.delete("/:id", postsController.deletePost(s3));

  return router;
};

export default postRoutes;
