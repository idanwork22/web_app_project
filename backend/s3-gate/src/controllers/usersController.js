import usersService from "../services/usersService";

const getAllUsersPhotos = (s3) => async (req, res) => {
  const data = await usersService.getAllUsersPhotos(s3);
  res.json(data);
};

const getUserPhoto = (s3) => async (req, res) => {
  const id = req.params.id;
  const data = await usersService.getUserPhoto(s3, id);
  if (data.success) {
    res.setHeader("Content-Type", "png"); // Set the appropriate content type for images
    res.send(data.result);
  } else {
    res.json(data);
  }
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
