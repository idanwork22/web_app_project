const users = [
  { id: 1, username: "Yoav", password: "123"},
  { id: 2, username: "Idan", password: "123"},
  { id: 3, username: "Omer", password: "123"},
  { id: 4, username: "Raz", password: "123"},
];

const getAllUsers = () => users;

const getUserById = (id) => 
users.find((user) => user.id === parseInt(id));

const createUser = (userData) => {
  const id = users.length + 1;
  const newUser = { id, ...userData };
  newUser.name && users.push(newUser);
  return newUser.name ? newUser : `Plesae enter "name" in body`;
};

const updateUser = (id, userData) => {
  id = parseInt(id);
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...userData };
    return users[userIndex];
  }

  return null;
};

const deleteUser = (id) => {
  id = parseInt(id);
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    return deletedUser[0];
  }

  return null;
};

// return True / False
const isUserExist = (username, password) => !!users.find((user) => user.username === username && user.password === password);

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  isUserExist,
};
