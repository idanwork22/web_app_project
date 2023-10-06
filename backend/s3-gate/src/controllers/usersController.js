import usersService from "../services/usersService";

const getAllUsersPhotos = (s3) => async (req, res) => {
  const data = await usersService.getAllUsersPhotos(s3);
  res.json(data);
};

const getUserPhoto = (s3) => async (req, res) => {
  const id = req.params.id;
  const data = await usersService.getUserPhoto(s3, id);
  res.json(data);
};

const createUserPhoto = (s3) => async (req, res) => {
  const id = req.params.id;
  const user_profile_image = req.body.user_profile_image;
  res.json(
    user_profile_image
      ? await usersService.createUserPhoto(s3, id, user_profile_image)
      : { success: false, message: "Please enter user_profile_image." }
  );
};

const updateUserPhoto = (s3) => async (req, res) => {
  const id = req.params.id;
  const user_profile_image = req.body.user_profile_image;
  res.json(
    user_profile_image
      ? await usersService.updateUserPhoto(s3, id, user_profile_image)
      : { success: false, message: "Please enter user_profile_image." }
  );
};

const deleteUserPhoto = (s3) => async (req, res) => {
  const id = req.params.id;
  const updatedPost = await usersService.deleteUserPhoto(s3, id);
  res.json(updatedPost);
};

module.exports = {
  getAllUsersPhotos,
  getUserPhoto,
  createUserPhoto,
  updateUserPhoto,
  deleteUserPhoto,
};
