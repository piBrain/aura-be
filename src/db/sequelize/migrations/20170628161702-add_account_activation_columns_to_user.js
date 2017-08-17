'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Users', 'active', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    queryInterface.addColumn('Users', 'activation_nonce', {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
    })
    queryInterface.addColumn('Users', 'activation_expiry', {
        type: Sequelize.DATE,
        allowNull: true
    })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Users', 'active')
    queryInterface.removeColumn('Users', 'activation_nonce')
    queryInterface.removeColumn('Users', 'activation_expiry')
  }
};
