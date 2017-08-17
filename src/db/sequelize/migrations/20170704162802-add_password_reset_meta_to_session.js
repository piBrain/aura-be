'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Sessions', 'password_reset_attempts', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    })
    queryInterface.addColumn('Sessions', 'last_password_reset_attempt', {
      type: Sequelize.DATE,
      allowNull: true,
    })
    queryInterface.addColumn('Sessions', 'supplied_reset_email', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Sessions', 'password_reset_attempts')
    queryInterface.removeColumn('Sessions', 'last_password_reset_attempt')
    queryInterface.removeColumn('Sessions', 'supplied_reset_email')
  }
};
