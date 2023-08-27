const EndUser = require("../models/endUser");

// Controller to register a new end user
const registerEndUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const endUser = await EndUser.create({
      name,
      email,
    });

    res.status(201).json(endUser);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error registering end user", error: error.message });
  }
};

// Controller to get all end users
const getAllEndUsers = async (req, res) => {
  try {
    const endUsers = await EndUser.findAll();
    res.json(endUsers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching end users", error: error.message });
  }
};

// Controller to get a single end user by ID
const getEndUserById = async (req, res) => {
  try {
    const { endUserId } = req.params;
    const endUser = await EndUser.findByPk(endUserId);

    if (!endUser) {
      res.status(404).json({ message: "End user not found" });
    } else {
      res.json(endUser);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching end user", error: error.message });
  }
};

// Controller to update end user details
const updateEndUser = async (req, res) => {
  try {
    const { endUserId } = req.params;
    const { name, email } = req.body;

    const endUser = await EndUser.findByPk(endUserId);

    if (!endUser) {
      res.status(404).json({ message: "End user not found" });
    } else {
      endUser.name = name;
      endUser.email = email;
      await endUser.save();

      res.json(endUser);
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating end user", error: error.message });
  }
};

// Controller to delete an end user
const deleteEndUser = async (req, res) => {
  try {
    const { endUserId } = req.params;
    const deletedRowsCount = await EndUser.destroy({
      where: { id: endUserId },
    });

    if (deletedRowsCount === 0) {
      res.status(404).json({ message: "End user not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting end user", error: error.message });
  }
};

module.exports = {
  registerEndUser,
  getAllEndUsers,
  getEndUserById,
  updateEndUser,
  deleteEndUser,
};
