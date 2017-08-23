'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.ENUM,
        values: ['REQUEST','RESPONSE'],
        allowNull: false
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      state: {
        type: Sequelize.JSONB,
        allowNull: true,
      }
    })

  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
