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

module.exports = {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
};
