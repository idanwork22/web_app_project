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
  if (req.body.contentType !== "mp4" && req.body.contentType !== "png") {
    res.json({
      success: false,
      result:
        "Incomplete group data provided, please enter contentType(png/mp4)",
    });
  } else {
    const newGroup = await groupService.createGroup(req.body);
    res.json(newGroup);
  }
};

const updateGroup = async (req, res) => {
  if (
    req.body.group_image &&
    req.body.contentType != "mp4" &&
    req.body.contentType != "png"
  ) {
    res.json({
      success: false,
      result:
        "Incomplete group data provided, please enter contentType(png/mp4)",
    });
  } else {
    const updatedGroup = await groupService.updateGroup(req.params.id, req.body);
    res.json(updatedGroup);
  }
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
