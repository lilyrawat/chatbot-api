const Conversation = require("../models/conversation");
const Chatbot = require("../models/chatbot");
const chatbotLogic = require("../chatbot");

const startConversation = async (req, res) => {
  try {
    const { chatbotId } = req.params; // Get the chatbot ID from the URL
    const { message } = req.body;

    // Check if the chatbot exists
    const chatbot = await Chatbot.findByPk(chatbotId);
    if (!chatbot) {
      return res.status(404).json({ message: "Chatbot not found" });
    }

    // Create a new conversation for the chatbot and end user
    const conversation = await Conversation.create({
      message,
      ChatbotId: chatbotId, // Associate the conversation with the chatbot
    });

    // Get chatbot response
    const chatbotResponse = chatbotLogic.getResponse(message);

    await Conversation.create({
      message: chatbotResponse,
      ChatbotId: chatbotId,
    });

    res.status(201).json(conversation);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error starting conversation", error: error.message });
  }
};

const getAllConversationsForChatbot = async (req, res) => {
  try {
    const { chatbotId } = req.params; // Get the chatbot ID from the URL

    // Fetch conversations associated with the chatbot
    const conversations = await Conversation.findAll({
      where: { ChatbotId: chatbotId },
    });

    res.json(conversations);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching conversations", error: error.message });
  }
};

const getConversationById = async (req, res) => {
  try {
    const { conversationId } = req.params; // Get the conversation ID from the URL

    // Fetch a single conversation
    const conversation = await Conversation.findByPk(conversationId, {});

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    res.json(conversation);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching conversation", error: error.message });
  }
};

// Controller to update a conversation
const updateConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { isCompleted } = req.body;

    const [updatedRowsCount, updatedConversations] = await Conversation.update(
      { isCompleted },
      { where: { id: conversationId }, returning: true }
    );

    if (updatedRowsCount === 0) {
      res.status(404).json({ message: "Conversation not found" });
    } else {
      res.json(updatedConversations[0]);
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating conversation", error: error.message });
  }
};

// Controller to end/delete a conversation
const endConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const deletedRowsCount = await Conversation.destroy({
      where: { id: conversationId },
    });

    if (deletedRowsCount === 0) {
      res.status(404).json({ message: "Conversation not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error ending conversation", error: error.message });
  }
};

module.exports = {
  startConversation,
  getAllConversationsForChatbot,
  getConversationById,
  updateConversation,
  endConversation,
};
