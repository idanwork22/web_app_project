import groupService from "../services/groupService";

const getAllGroups = async (req, res) => {
  const data = await groupService.getAllGroups();
  res.json(data);
};

const getGroupById = async (req, res) => {
  const data = await groupService.getGroupById(req.params.id);
  res.json(data);
};

const createGroup = async (req, res) => {
  const newGroup = await groupService.createGroup(req.body);
  res.json(newGroup);
};

const updateGroup = async (req, res) => {
  const updatedGroup = await groupService.updateGroup(req.params.id, req.body);
  res.json(updatedGroup);
};

const deleteGroup = async (req, res) => {
  const deletedGroup = await groupService.deleteGroup(req.params.id);
  res.json(deletedGroup);
};

const addUserToGroup = async (req, res) => {
  const group_id = req.params.id;
  const user_id = req.params.user_id;
  const result = await groupService.addUserToGroup(group_id, user_id);
  res.json(result);
};

const deleteUserFromGroup = async (req, res) => {
  const group_id = req.params.id;
  const user_id = req.params.user_id;
  const result = await groupService.deleteUserFromGroup(group_id, user_id);
  res.json(result);
};

module.exports = {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
  addUserToGroup,
  deleteUserFromGroup,
};
