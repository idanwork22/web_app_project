import express from "express";
import userController from "../controllers/userController";

const userRoutes = (db) => {
  const router = express.Router();

  router.get("/", userController.getAllUsers(db));
  router.get("/:id", userController.getUserById);
  router.get("/username/:username", userController.getUserIdByUsername);
  router.post("/", userController.createUser);
  router.post("/login", userController.isUserExist);
  router.put("/:id", userController.updateUser);
  router.delete("/:id", userController.deleteUser);

  return router;
};

export default userRoutes;
