'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('ConfigItems', {
            ConfigId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Configs',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            ItemId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Items',
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
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('ConfigItems');
    }
};