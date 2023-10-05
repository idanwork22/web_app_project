import userService from "../services/userService";

const getAllUsers = async (req, res) => {
  const data = await userService.getAllUsers();
  res.json(data);
};

const getUserById = async (req, res) => {
  const data = await userService.getUserById(req.params.id);
  res.json(data);
};

const getUserByUsername = async (req, res) => {
  const data = await userService.getUserByUsername(req.params.username);
  res.json(data);
};

const createUser = async (req, res) => {
  const newUser = await userService.createUser(req.body);
  res.json(newUser);
};

const updateUser = async (req, res) => {
  const updatedUser = await userService.updateUser(req.params.id, req.body);
  res.json(updatedUser);
};

const deleteUser = async (req, res) => {
  const deletedUser = await userService.deleteUser(req.params.id);
  res.json(deletedUser);
};

const isUserExist = async (req, res) => {
  const loginResponse = await userService.isUserExist(req.body);
  res.json(loginResponse);
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
  isUserExist,
};
