const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

// Route to create a new user
router.post("/", UserController.createUser);

// Route to get all users
router.get("/", UserController.getAllUsers);

// Route to get a single user by ID
router.get("/:id", UserController.getUserById);

// Route to update a user by ID
router.put("/:id", UserController.updateUser);

// Route to delete a user by ID
router.delete("/:id", UserController.deleteUser);

module.exports = router;
