import express from "express";
import groupController from "../controllers/groupController";

const router = express.Router();

router.get("/", groupController.getAllGroups);
router.get("/:id", groupController.getGroupById);
router.post("/", groupController.createGroup);
router.post("/:id/user/:user_id", groupController.addUserToGroup);
router.put("/:id", groupController.updateGroup);
router.delete("/:id", groupController.deleteGroup);
router.delete("/:id/user/:user_id", groupController.deleteUserFromGroup);

export default router;
