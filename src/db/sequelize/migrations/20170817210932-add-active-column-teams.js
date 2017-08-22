'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Teams', 'active', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Teams', 'active')
  }
};
