'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const attributes = await queryInterface.describeTable('users');
    if (!attributes.pendingSentRequests) {
      await queryInterface.addColumn('users', 'pendingSentRequests', {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const attributes = await queryInterface.describeTable('users');
    if (attributes.pendingSentRequests) {
      await queryInterface.removeColumn('users', 'pendingSentRequests');
    }
  },
};