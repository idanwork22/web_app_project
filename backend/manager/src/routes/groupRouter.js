import express from "express";
import groupController from "../controllers/groupController";

const router = express.Router();

router.get("/", groupController.getAllGroups);
router.get("/:id/:user_id", groupController.getAllUserRelatedGroups);
router.get("/:id", groupController.getGroupById);
router.post("/", groupController.createGroup);
router.put("/:id", groupController.updateGroupInfo);
router.delete("/:id", groupController.deleteGroup);
router.post("/:id/:user_id", groupController.addUserToGroup);
router.delete("/:id/:user_id", groupController.removeUserFromGroup);


export default router;
