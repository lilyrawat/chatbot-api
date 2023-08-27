const express = require("express");
const router = express.Router();
const endUserController = require("../controllers/endUserController");

// Register a new end user
router.post("/endusers", endUserController.registerEndUser);

// Get all end users
router.get("/endusers", endUserController.getAllEndUsers);

// Get a single end user by ID
router.get("/endusers/:endUserId", endUserController.getEndUserById);

// Update end user details
router.put("/endusers/:endUserId", endUserController.updateEndUser);

// Delete an end user
router.delete("/endusers/:endUserId", endUserController.deleteEndUser);

module.exports = router;
