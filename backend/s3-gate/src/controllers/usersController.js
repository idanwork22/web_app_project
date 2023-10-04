import usersService from "../services/usersService";

const getAllUsersPhotos = (req, res) => {
  const data = usersService.getAllUsersPhotos();
  res.json(data);
};

const getUserPhoto = (req, res) => {
  const id = req.params.id;
  const data = usersService.getUserPhoto(id);
  res.json(data);
};

const createUserPhoto = (req, res) => {
  const id = req.params.id;
  const user_profile_image = req.body.user_profile_image;
  res.json(
    user_profile_image
      ? usersService.createUserPhoto(id, user_profile_image)
      : { success: false, message: "Please enter user_profile_image." }
  );
};

const updateUserPhoto = (req, res) => {
  const id = req.params.id;
  const user_profile_image = req.body.user_profile_image;
  res.json(
    user_profile_image
      ? usersService.updateUserPhoto(id, user_profile_image)
      : { success: false, message: "Please enter user_profile_image." }
  );
};

const deleteUserPhoto = (req, res) => {
  const id = req.params.id;
  const updatedPost = usersService.deleteUserPhoto(id);
  res.json(updatedPost);
};

module.exports = {
  getAllUsersPhotos,
  getUserPhoto,
  createUserPhoto,
  updateUserPhoto,
  deleteUserPhoto,
};
