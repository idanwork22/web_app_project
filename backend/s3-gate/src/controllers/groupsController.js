import groupsService from "../services/groupsService";

const getAllGroups = (s3) => async (req, res) => {
  const data = await groupsService.getAllGroups(s3);
  res.json(data);
};

const getGroupById = (s3) => async (req, res) => {
  const id = req.params.id;
  const data = await groupsService.getGroupById(s3, id);
  res.json(data);
};

const createGroup = (s3) => async (req, res) => {
  const id = req.params.id;
  const gruop_image = req.body.gruop_image;

  res.json(
    gruop_image
      ? await groupsService.createGroup(s3, id, gruop_image)
      : { success: false, result: "Incomplete post data provided." }
  );
};

const updateGroupInfo = (s3) => async (req, res) => {
  const id = req.params.id;
  const group_image = req.body.group_image;

  res.json(
    group_image
      ? await groupsService.updateGroupInfo(s3, id, group_image)
      : { success: false, result: "Incomplete post data provided." }
  );
};

const deleteGroup = (s3) => async (req, res) => {
  const id = req.params.id;
  const deletedGrup = await groupsService.deleteGroup(s3, id);
  res.json(deletedGrup);
};

module.exports = {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroupInfo,
  deleteGroup,
};
