'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Conversation.init({
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    type: DataTypes.ENUM('group', 'couple'),
    draftMessage: DataTypes.STRING,
    admins: DataTypes.ARRAY(DataTypes.INTEGER),
    contacts: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    sequelize,
    modelName: 'Conversation',
  });
  return Conversation;
};