'use strict';
module.exports = function(sequelize, DataTypes) {
  var Session = sequelize.define('Session', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: { type: DataTypes.INTEGER, field: 'user_id' },
    nonce: DataTypes.STRING,
    passwordResetAttempts: { type: DataTypes.STRING, field: 'password_reset_attempts' },
    lastPasswordResetAttempt: { type: DataTypes.DATE, field: 'last_password_reset_attempt' },
    suppliedResetEmail: { type: DataTypes.STRING, field: 'supplied_reset_email' },
  }, { underscored: true });

  Session.associate = (models) => {
    Session.belongsTo(models.User)
  }
  return Session;
};
