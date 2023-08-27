const Chatbot = require("../models/chatbot");
const User = require("../models/user");

const createChatbot = async (req, res) => {
  try {
    const { userId } = req.params; // Get the user ID from the URL
    const { name, description } = req.body;

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new chatbot associated with the user
    const chatbot = await Chatbot.create({
      name,
      description,
      UserId: userId, // Associate the chatbot with the user
    });

    res.status(201).json(chatbot);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating chatbot", error: error.message });
  }
};

const getAllChatbotsForUser = async (req, res) => {
  try {
    const { userId } = req.params; // Get the user ID from the URL

    // Fetch chatbots associated with the user
    const chatbots = await Chatbot.findAll({
      where: { UserId: userId },
    });

    res.json(chatbots);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching chatbots", error: error.message });
  }
};

const getChatbotById = async (req, res) => {
  try {
    const { chatbotId } = req.params; // Get the chatbot ID from the URL

    // Fetch a single chatbot
    const chatbot = await Chatbot.findByPk(chatbotId);

    if (!chatbot) {
      return res.status(404).json({ message: "Chatbot not found" });
    }

    res.json(chatbot);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching chatbot", error: error.message });
  }
};

// Controller to update a chatbot
const updateChatbot = async (req, res) => {
  try {
    const { chatbotId } = req.params;
    const { name, description } = req.body;

    const [updatedRowsCount, updatedChatbots] = await Chatbot.update(
      { name, description },
      { where: { id: chatbotId }, returning: true }
    );

    if (updatedRowsCount === 0) {
      res.status(404).json({ message: "Chatbot not found" });
    } else {
      res.json(updatedChatbots[0]);
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating chatbot", error: error.message });
  }
};

// Controller to delete a chatbot
const deleteChatbot = async (req, res) => {
  try {
    const { chatbotId } = req.params;
    const deletedRowsCount = await Chatbot.destroy({
      where: { id: chatbotId },
    });

    if (deletedRowsCount === 0) {
      res.status(404).json({ message: "Chatbot not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting chatbot", error: error.message });
  }
};

module.exports = {
  createChatbot,
  getAllChatbotsForUser,
  getChatbotById,
  updateChatbot,
  deleteChatbot,
};
