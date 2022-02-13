'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const attributes = await queryInterface.describeTable('users');
    if (!attributes.friends) {
      await queryInterface.addColumn('users', 'friends', {
        type: DataTypes.INTEGER,
        defaultValue: 0
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const attributes = await queryInterface.describeTable('users');
    if (attributes.friends) {
      await queryInterface.removeColumn('users', 'friends');
    }
  },
};