'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const attributes = await queryInterface.describeTable('comments');
    if (!attributes.parentCommentId) {
      await queryInterface.addColumn('comments', 'parentCommentId', {
        type: DataTypes.STRING,
        defaultValue: null
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const attributes = await queryInterface.describeTable('comments');
    if (attributes.parentCommentId) {
      await queryInterface.removeColumn('comments', 'parentCommentId');
    }
  },
};