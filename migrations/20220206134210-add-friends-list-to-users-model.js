'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const attributes = await queryInterface.describeTable('users');
    if (!attributes.friendsList) {
      await queryInterface.addColumn('users', 'friendsList', {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const attributes = await queryInterface.describeTable('users');
    if (attributes.friendsList) {
      await queryInterface.removeColumn('users', 'friendsList');
    }
  },
};