const express = require("express");
const User = require("./models/user");
const Chatbot = require("./models/chatbot");
const Conversation = require("./models/conversation");
const EndUser = require("./models/endUser");
const sequelize = require("./config/database");
const userRoutes = require("./routes/users");
const chatbotRoutes = require("./routes/chatbots");
const conversationRoutes = require("./routes/conversations");
const endUserRoutes = require("./routes/endUsers");
const app = express();

app.use(express.json());

const models = {
  User,
  Chatbot,
  Conversation,
  EndUser,
};

// Associate the models
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Use the routes
app.use("/users", userRoutes);
app.use("/chatbots", chatbotRoutes);
app.use("/conversations", conversationRoutes);
app.use("/endusers", endUserRoutes);

sequelize.sync({ force: true }).then(() => {
  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
});
