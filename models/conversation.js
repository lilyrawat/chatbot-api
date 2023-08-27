// models/Conversation.js
const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Conversation = sequelize.define("Conversation", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  isCompleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
});

Conversation.associate = (models) => {
  Conversation.belongsTo(models.Chatbot, {
    foreignKey: {
      allowNull: false,
    },
  });

  Conversation.belongsTo(models.EndUser, {
    foreignKey: {
      allowNull: true,
    },
  });
};

module.exports = Conversation;
