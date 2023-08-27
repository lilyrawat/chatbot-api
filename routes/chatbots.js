const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/chatbotController");

// Create a new chatbot for a user
router.post("/users/:userId", chatbotController.createChatbot);

// Get all chatbots for a user
router.get("/users/:userId", chatbotController.getAllChatbotsForUser);

// Get a single chatbot by ID
router.get("/:chatbotId", chatbotController.getChatbotById);

// Update a chatbot
router.put("/:chatbotId", chatbotController.updateChatbot);

// Delete a chatbot
router.delete("/:chatbotId", chatbotController.deleteChatbot);

module.exports = router;
