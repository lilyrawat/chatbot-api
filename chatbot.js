const chatbotLogic = {
  getResponse: (userMessage) => {
    userMessage = userMessage.toLowerCase();

    if (userMessage.includes("hello")) {
      return "Hi there! How can I assist you today?";
    } else if (userMessage.includes("how are you")) {
      return "I'm just a bot, but I'm here to help!";
    } else if (userMessage.includes("bye")) {
      return "Goodbye! Have a great day!";
    } else {
      return "I'm sorry, I didn't quite understand that.";
    }
  },
};

module.exports = chatbotLogic;

//curl -X POST -H "Content-Type: application/json" -d '{"message": "Hello"}' http://localhost:3000/chat
