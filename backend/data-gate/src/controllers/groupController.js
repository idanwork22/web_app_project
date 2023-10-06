import groupService from "../services/groupService";

const getAllGroups = async (req, res) => {
  const data = await groupService.getAllGroups();
  res.json(data);
};

const getAllUserRelatedGroups = async (req, res) => {
  const data = await groupService.getAllUserRelatedGroups();
  res.json(data);
};

const getGroupById = async (req, res) => {
  const data = await groupService.getGroupById(req.params.id);
  res.json(data);
};

const createGroup = async (req, res) => {
  const newPost = await groupService.createGroup(req.body);
  res.json(newPost);
};

const updateGroupInfo = async (req, res) => {
  const updatedPost = await groupService.updateGroupInfo(req.params.id, req.body);
  res.json(updatedPost);
};

const addUserToGroup = async (req, res) => {
  const deletedPost = await groupService.addUserToGroup(req.params.id);
  res.json(deletedPost);
};

const removeUserFromGroup = async (req, res) => {
  const deletedPost = await groupService.removeUserFromGroup(req.params.id);
  res.json(deletedPost);
};

const deleteGroup = async (req, res) => {
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
  getAllUserRelatedGroups
};