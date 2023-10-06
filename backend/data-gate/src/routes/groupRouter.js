import express from "express";
import groupController from "../controllers/groupController";

const groupRoutes = (db) => {
    const router = express.Router();

router.get("/", groupController.getAllGroups(db));
router.get("/:id/:user_id", groupController.getAllUserRelatedGroups(db));
router.get("/:id", groupController.getGroupById(db));
router.post("/", groupController.createGroup(db));
router.put("/:id", groupController.updateGroupInfo(db));
router.delete("/:id", groupController.deleteGroup(db));
router.post("/:id/:user_id", groupController.addUserToGroup(db));
router.delete("/:id/:user_id", groupController.removeUserFromGroup(db));

return router;
};

export default groupRoutes;
