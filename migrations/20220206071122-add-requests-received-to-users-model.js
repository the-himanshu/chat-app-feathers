'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const attributes = await queryInterface.describeTable('users');
    if (!attributes.requestsReceived) {
      await queryInterface.addColumn('users', 'requestsReceived', {
        type: DataTypes.INTEGER,
        defaultValue: 0
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const attributes = await queryInterface.describeTable('users');
    if (attributes.requestsReceived) {
      await queryInterface.removeColumn('users', 'requestsReceived');
    }
  },
};