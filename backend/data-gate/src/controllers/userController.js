import userService from "../services/userService";

const getAllUsers = (req, res) => {
  const data = userService.getAllUsers();
  res.json(data);
};

const getUserById = (req, res) => {
  const id = req.params.id;
  const data = userService.getUserById(id);
  res.json(data ? data : 'NotFound');
};

const createUser = (req, res) => {
  const userData = {
    user_first_name: req.body.user_first_name,
    user_last_name: req.body.user_last_name,
    user_password: req.body.user_password,
    user_email_address: req.body.user_email_address,
    user_phone_number: req.body.user_phone_number,
    user_date_of_birth: req.body.user_date_of_birth,
    user_gender: req.body.user_gender,
    user_current_work: req.body.user_current_work,
    user_profile_image: req.body.user_profile_image
  };

  const isAllDataAvailable = Object.values(userData).every(Boolean);
  res.json(
    isAllDataAvailable
      ? userService.createUser(userData)
      : { success: false, message: 'Incomplete user data provided.' }
  ); 
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const userData = {
    user_first_name: req.body.user_first_name,
    user_last_name: req.body.user_last_name,
    user_password: req.body.user_password,
    user_email_address: req.body.user_email_address,
    user_phone_number: req.body.user_phone_number,
    user_date_of_birth: req.body.user_date_of_birth,
    user_gender: req.body.user_gender,
    user_current_work: req.body.user_current_work,
    user_profile_image: req.body.user_profile_image
  };
  const isAllDataAvailable = Object.values(userData).every(Boolean);
  res.json(
    isAllDataAvailable
      ? userService.updateUser(id, userData)
      : { success: false, message: 'Incomplete user data provided.' }
  );
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  const deletedUser = userService.deleteUser(id);
  res.json(deletedUser);
};

const isUserExist = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const deletedUser = userService.isUserExist(username, password);
  res.json(deletedUser);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  isUserExist,
};
