'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const attributes = await queryInterface.describeTable('users');
    if (!attributes.pendingReceivedRequests) {
      await queryInterface.addColumn('users', 'pendingReceivedRequests', {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const attributes = await queryInterface.describeTable('users');
    if (attributes.pendingReceivedRequests) {
      await queryInterface.removeColumn('users', 'pendingReceivedRequests');
    }
  },
};