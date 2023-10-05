import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.get("/username/:username", userController.getUserByUsername);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.post("/login", userController.isUserExist);
router.delete("/:id", userController.deleteUser);

export default router;
