const express = require("express");
const router = express.Router();
const endUserController = require("../controllers/endUserController");

// Register a new end user
router.post("/", endUserController.registerEndUser);

// Get all end users
router.get("/", endUserController.getAllEndUsers);

// Get a single end user by ID
router.get("/:endUserId", endUserController.getEndUserById);

// Update end user details
router.put("/:endUserId", endUserController.updateEndUser);

// Delete an end user
router.delete("/:endUserId", endUserController.deleteEndUser);

module.exports = router;
