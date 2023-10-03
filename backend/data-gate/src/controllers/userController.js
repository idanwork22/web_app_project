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
  const name = req.body.name;
  const newUser = userService.createUser({name});
  res.json(newUser);
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const updatedUser = userService.updateUser(id, data);
  res.json(updatedUser);
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
