const users = [
  { id: 1, username: "Yoav", password: "123", user_profile_image: "image1" },
  { id: 2, username: "Idan", password: "123", user_profile_image: "image2" },
  { id: 3, username: "Omer", password: "123", user_profile_image: "image3" },
  { id: 4, username: "Raza", password: "123", user_profile_image: "image4" },
];

const getAllUsersPhotos = () => users;

const getUserPhoto = (id) => {
  id = parseInt(id);
  const userIndex = users.findIndex((user) => user.id === id);
  return userIndex !== -1
    ? users[userIndex].user_profile_image
    : { success: false, message: "User not found." };
};

const createUserPhoto = (id, user_profile_image) => {
  id = parseInt(id);
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    const newUser = { id, user_profile_image };
    users.push(newUser);
    return newUser;
  }

  return { success: false, message: "User already exists." };
};

const updateUserPhoto = (id, user_profile_image) => {
  id = parseInt(id);
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], user_profile_image };
    return users[userIndex];
  }

  return { success: false, message: "User not found." };
};

const deleteUserPhoto = (id) => {
  id = parseInt(id);
  const userIndex = users.findIndex((user) => user.id === id);
  
  if (userIndex !== -1) {
    users[userIndex].user_profile_image = "";
    return users[userIndex];
  }

  return { success: false, message: "User not found." };
};

module.exports = {
  getAllUsersPhotos,
  getUserPhoto,
  createUserPhoto,
  updateUserPhoto,
  deleteUserPhoto,
};
