const express = require("express");
const router = express.Router();
const conversationController = require("../controllers/conversationController");

// Start a new conversation for a chatbot
router.post("/chatbots/:chatbotId/", conversationController.startConversation);

// Get all conversations for a chatbot
router.get(
  "/chatbots/:chatbotId",
  conversationController.getAllConversationsForChatbot
);

// Get a single conversation by ID
router.get("/:conversationId", conversationController.getConversationById);

// Update a conversation
router.put("/:conversationId", conversationController.updateConversation);

// End/delete a conversation
router.delete("/:conversationId", conversationController.endConversation);

module.exports = router;
