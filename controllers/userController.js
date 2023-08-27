const User = require("../models/user");

// Controller function to create a new user
const createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const newUser = await User.create({
      username,
      password,
      email,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating user", error: error.message });
  }
};

// Controller function to retrieve all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// Controller function to retrieve a single user by ID
const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

// Controller function to update a user
const updateUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const [updatedUser] = await User.update(req.body, {
      where: { id: userId },
      returning: true,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating user", error: error.message });
  }
};

// Controller function to delete a user
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedRowsCount = await User.destroy({
      where: { id: userId },
    });

    if (deletedRowsCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
