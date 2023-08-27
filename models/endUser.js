// models/endUser.js
const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const EndUser = sequelize.define("EndUser", {
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
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

EndUser.associate = (models) => {
  EndUser.hasMany(models.Conversation, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

module.exports = EndUser;
