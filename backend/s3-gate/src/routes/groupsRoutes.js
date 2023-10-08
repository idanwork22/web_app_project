import express from "express";
import groupsController from "../controllers/groupsController";

const groupRoutes = (s3) => {
  const router = express.Router();

  router.get("/", groupsController.getAllGroups(s3));
  router.get("/:id", groupsController.getGroupById(s3));
  router.post("/:id", groupsController.createGroup(s3));
  router.put("/:id", groupsController.updateGroupInfo(s3));
  router.delete("/:id", groupsController.deleteGroup(s3));

  return router;
};

export default groupRoutes;
