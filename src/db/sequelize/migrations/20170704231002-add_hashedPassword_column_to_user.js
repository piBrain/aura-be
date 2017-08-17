'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    })
    queryInterface.addColumn('Users', 'sign_in_type', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'password'
    })
    queryInterface.addColumn('Users', 'in_password_reset', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Users', 'password')
    queryInterface.removeColumn('Users', 'sign_in_type')
    queryInterface.removeColumn('Users', 'in_password_reset')
  }
};
