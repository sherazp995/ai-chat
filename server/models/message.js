'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.belongsTo(models.Conversation, {
        foreignKey: 'conversationId'
      });
      Message.belongsTo(models.User, {
        foreignKey: 'senderId',
        as: 'sender',
      });
    }
  }
  Message.init({
    type: DataTypes.STRING,
    content: DataTypes.TEXT,
    aiResponse: DataTypes.TEXT,
    date: DataTypes.STRING,
    senderId: DataTypes.INTEGER,
    replyTo: DataTypes.STRING,
    conversationId: DataTypes.INTEGER,
    state: DataTypes.ENUM('read', 'sent', 'delivered', 'waiting')
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};