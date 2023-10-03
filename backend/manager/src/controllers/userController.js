import userService from "../services/userService";

const getAllUsers = async (req, res) => {
  const data = await userService.getAllUsers();
  res.json(data);
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  const data = await userService.getUserById(id);
  res.json(data);
};

const createUser = async (req, res) => {
  const newUser = await userService.createUser(req.body);
  res.json(newUser);
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const updatedUser = await userService.updateUser(id, data);
  res.json(updatedUser);
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const deletedUser = await userService.deleteUser(id);
  res.json(deletedUser);
};

const isUserExist = async (req, res) => {
  const loginResponse = await userService.isUserExist(req.body);
  res.json(loginResponse);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  isUserExist,
};
