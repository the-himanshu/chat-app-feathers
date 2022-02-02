'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const attributes = await queryInterface.describeTable('users');
    if (!attributes.bio) {
      await queryInterface.addColumn('users', 'bio', {
        type: DataTypes.STRING,
        defaultValue: ''
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const attributes = await queryInterface.describeTable('users');
    if (attributes.bio) {
      await queryInterface.removeColumn('users', 'bio');
    }
  },
};