import userService from "../services/userService";

const getAllUsers = (db) => async (req, res) => {
  const data = await userService.getAllUsers(db);
  res.json(data);
};

const getUserById = (db) => async (req, res) => {
  const id = req.params.id;
  const data = await userService.getUserById(db, id);
  res.json(data);
};

const createUser = (db) => async (req, res) => {
  const userData = {
    username: req.body.username,
    user_first_name: req.body.user_first_name,
    user_last_name: req.body.user_last_name,
    password: req.body.password,
    user_email_address: req.body.user_email_address,
    user_phone_number: req.body.user_phone_number,
    user_date_of_birth: req.body.user_date_of_birth,
    user_gender: req.body.user_gender,
    current_work_place: req.body.current_work_place,
    user_profile_image: req.body.user_profile_image,
  };

  const isAllDataAvailable = Object.values(userData).every(Boolean);
  res.json(
    isAllDataAvailable
      ? await userService.createUser(db, userData)
      : { success: false, result: "Incomplete user data provided." }
  );
};

const updateUser = (db) => async (req, res) => {
  const id = req.params.id;
  const userData = {
    username: req.body.username,
    user_first_name: req.body.user_first_name,
    user_last_name: req.body.user_last_name,
    password: req.body.password,
    user_email_address: req.body.user_email_address,
    user_phone_number: req.body.user_phone_number,
    user_date_of_birth: req.body.user_date_of_birth,
    user_gender: req.body.user_gender,
    current_work_place: req.body.current_work_place,
    user_profile_image: req.body.user_profile_image,
  };

  const filteredUserData = Object.keys(userData).reduce((acc, key) => {
    if (userData[key] !== undefined) {
      acc[key] = userData[key];
    }
    return acc;
  }, {});

  res.json(await userService.updateUser(db, id, filteredUserData));
};

const deleteUser = (db) => async (req, res) => {
  const id = req.params.id;
  const deletedUser = await userService.deleteUser(db, id);
  res.json(deletedUser);
};

const isUserExist = (db) => async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const deletedUser = await userService.isUserExist(db, username, password);
  res.json(deletedUser);
};

const getUserIdByUsername = (db) => async (req, res) => {
  const username = req.params.username;
  const userId = await userService.getUserIdByUsername(db, username);
  res.json(userId);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  isUserExist,
  getUserIdByUsername,
};
