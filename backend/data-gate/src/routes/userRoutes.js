import express from "express";
import userController from "../controllers/userController";

const userRoutes = (db) => {
  const router = express.Router();

  router.get("/", userController.getAllUsers(db));
  router.get("/:id", userController.getUserById(db));
  router.get("/username/:username", userController.getUserIdByUsername(db));
  router.post("/", userController.createUser(db));
  router.post("/login", userController.isUserExist(db));
  router.put("/:id", userController.updateUser(db));
  router.delete("/:id", userController.deleteUser(db));

  return router;
};

export default userRoutes;
