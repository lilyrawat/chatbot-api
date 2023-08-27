// models/ChatBot.js
const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Chatbot = sequelize.define("Chatbot", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

Chatbot.associate = (models) => {
  Chatbot.belongsTo(models.User, {
    foreignKey: {
      allowNull: false,
    },
  });
};

module.exports = Chatbot;
