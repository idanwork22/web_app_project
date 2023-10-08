import express from "express";
import groupController from "../controllers/groupController";

const router = express.Router();

router.get("/", groupController.getAllGroups);
router.get("/:id", groupController.getGroupById);
router.post("/", groupController.createGroup);
router.put("/:id", groupController.updateGroup);
router.delete("/:id", groupController.deleteGroup);
//TODO: add routes for add and remove user from group

export default router;
