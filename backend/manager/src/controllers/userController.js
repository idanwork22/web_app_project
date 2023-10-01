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
  const name = req.body.name;
  const newUser = await userService.createUser({name});
  res.json(newUser);
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const updatedUser = userService.updateUser(id, data);
  res.json(updatedUser);
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const deletedUser = await userService.deleteUser(id);
  res.json(deletedUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
