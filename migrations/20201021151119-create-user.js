'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        unique: true,
        required: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        required: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        unique: true,
        required: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      role: {
        required: true,
        allowNull: false,
        type: Sequelize.STRING,
        default: "User"
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};