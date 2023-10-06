import express from "express";
import postController from "../controllers/postController";

const postRoutes = (db) => {
  const router = express.Router();

  router.get("/", postController.getAllPosts(db));
  router.get("/:id", postController.getPostById(db));
  router.post("/", postController.createPost(db));
  router.put("/:id", postController.updatePost(db));
  router.delete("/:id", postController.deletePost(db));

  return router;
};

export default postRoutes;
