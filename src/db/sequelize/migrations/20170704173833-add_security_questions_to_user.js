'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Users', 'sec_question_1', {
      type: Sequelize.ENUM,
      values: ['What was the name of your first pet?', 'What was your most rewarding moment in life?', 'What was the name of your first kiss?', 'What celebrity do you most resemble?'],
      allowNull: false,
    })
    queryInterface.addColumn('Users', 'sec_question_2', {
      type: Sequelize.ENUM,
      values: ['What was the name of your first pet?', 'What was your most rewarding moment in life?', 'What was the name of your first kiss?', 'What celebrity do you most resemble?'],
      allowNull: false,
    })
    queryInterface.addColumn('Users', 'sec_question_response_1', {
      type: Sequelize.STRING,
      allowNull: false,
    })
    queryInterface.addColumn('Users', 'sec_question_Response_2', {
      type: Sequelize.STRING,
      allowNull: false,
    })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Users', 'sec_question_1')
    queryInterface.removeColumn('Users', 'sec_question_2')
    queryInterface.removeColumn('Users', 'sec_question_response_1')
    queryInterface.removeColumn('Users', 'sec_question_response_2')
  }
};
