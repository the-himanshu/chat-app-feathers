'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const attributes = await queryInterface.describeTable('comments');
    if (!attributes.replies) {
      await queryInterface.addColumn('comments', 'replies', {
        type: DataTypes.INTEGER,
        defaultValue: 0
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const attributes = await queryInterface.describeTable('comments');
    if (attributes.replies) {
      await queryInterface.removeColumn('comments', 'replies');
    }
  },
};