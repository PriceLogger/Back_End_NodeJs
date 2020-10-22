'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        unique: true,
        required: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      url: {
        unique: true,
        required: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      id_provider: {
        required: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'providers',
          key: 'id',
        }
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
    await queryInterface.dropTable('Items');
  }
};