import groupService from "../services/groupService";

const getAllGroups = (db) => async (req, res) => {
  const data = await groupService.getAllGroups(db);
  res.json(data);
};

const getAllUserRelatedGroups = (db) => async (req, res) => {
  const data = await groupService.getAllUserRelatedGroups(
    db,
    req.params.user_id
  );
  res.json(data);
};

const getGroupById = (db) => async (req, res) => {
  const data = await groupService.getGroupById(db, req.params.id);
  res.json(data);
};

const createGroup = (db) => async (req, res) => {
  const newPost = await groupService.createGroup(req.body);
  res.json(newPost);
};

const updateGroupInfo = (db) => async (req, res) => {
  const updatedPost = await groupService.updateGroupInfo(
    req.params.id,
    req.body
  );
  res.json(updatedPost);
};

const addUserToGroup = (db) => async (req, res) => {
  const deletedPost = await groupService.addUserToGroup(req.params.id);
  res.json(deletedPost);
};

const removeUserFromGroup = (db) => async (req, res) => {
  const deletedPost = await groupService.removeUserFromGroup(req.params.id);
  res.json(deletedPost);
};

const deleteGroup = (db) => async (req, res) => {
  const deletedPost = await groupService.deleteGroup(req.params.id);
  res.json(deletedPost);
};

module.exports = {
  getAllGroups,
  removeUserFromGroup,
  addUserToGroup,
  getGroupById,
  createGroup,
  deleteGroup,
  updateGroupInfo,
  getAllUserRelatedGroups,
};
