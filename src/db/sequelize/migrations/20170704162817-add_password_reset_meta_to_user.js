'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Users', 'locked', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    })
    queryInterface.addColumn('Users', 'reset_token', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    })
    queryInterface.addColumn('Users', 'phone_number', {
      type: Sequelize.STRING,
      allowNull: false,
    })
    queryInterface.addColumn('Users', 'reset_expiry', {
      type: Sequelize.DATE,
      allowNull: true,
    })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Users', 'locked')
    queryInterface.removeColumn('Users', 'reset_token')
    queryInterface.removeColumn('Users', 'phone_number')
    queryInterface.removeColumn('Users', 'reset_expiry')
  }
};
