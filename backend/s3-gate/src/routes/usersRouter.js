import express from "express";
import usersController from "../controllers/usersController";

const userRoutes = (s3) => {
  const router = express.Router();

  router.get("/photo", usersController.getAllUsersPhotos(s3));
  router.get("/:id/photo", usersController.getUserPhoto(s3));
  router.post("/:id/photo", usersController.createUserPhoto(s3));
  router.put("/:id/photo", usersController.updateUserPhoto(s3));
  router.delete("/:id/photo", usersController.deleteUserPhoto(s3));

  return router;
};

export default userRoutes;
