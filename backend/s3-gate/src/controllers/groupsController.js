import groupsService from "../services/groupsService";

const getAllGroups = (s3) => async (req, res) => {
  const data = await groupsService.getAllGroups(s3);
  res.json(data);
};

const getGroupById = (s3) => async (req, res) => {
  const id = req.params.id;
  const data = await groupsService.getGroupById(s3, id);
  res.json(data);
  } 
;

const createGroup = (s3) => async (req, res) => {
  const id = req.params.id;
  const postData = {
    gruop_image: req.body.gruop_image,
  };
  const isAllDataAvailable = Object.values(postData).every(Boolean);
  res.json(
    isAllDataAvailable
      ? await groupsService.createGroup(s3, id, postData)
      : { success: false, result: "Incomplete post data provided." }
  );
};

const updateGroupInfo = (s3) => async (req, res) => {
  const id = req.params.id;
  const postData = {
    group_image: req.body.group_image,
  };
  const isAllDataAvailable = Object.values(postData).every(Boolean);
  res.json(
      isAllDataAvailable
        ? await groupsService.updateGroupInfo(s3, id, postData)
        : { success: false, result: "Incomplete post data provided." }
    );
};

const deleteGroup = (s3) => async (req, res) => {
  const id = req.params.id;
  const deletedGrup = await groupsService.deleteGroup(s3, id, contentType);
  res.json(deletedGrup);
};

module.exports = {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroupInfo,
  deleteGroup,
};
