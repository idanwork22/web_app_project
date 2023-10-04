import express from "express";
import usersController from "../controllers/usersController";

const router = express.Router();

router.get("/photo", usersController.getAllUsersPhotos);
router.get("/:id/photo", usersController.getUserPhoto);
router.post("/:id/photo", usersController.createUserPhoto);
router.put("/:id/photo", usersController.updateUserPhoto);
router.delete("/:id/photo", usersController.deleteUserPhoto);

export default router;
