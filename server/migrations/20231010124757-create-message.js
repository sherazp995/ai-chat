'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      senderId: {
        type: Sequelize.INTEGER
      },
      replyTo: {
        type: Sequelize.STRING
      },
      conversationId: {
        type: Sequelize.INTEGER
      },
      state: {
        type: Sequelize.ENUM('read', 'sent', 'delivered', 'waiting')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Messages');
  }
};