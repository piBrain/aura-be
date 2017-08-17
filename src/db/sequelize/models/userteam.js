'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserTeam = sequelize.define('UserTeam', {
    active: { type: DataTypes.BOOLEAN, defaultValue: false },
    activationNonce: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER, field: 'user_id' },
    teamId: { type: DataTypes.INTEGER, field: 'team_id' },
    type: DataTypes.ENUM('OWNER', 'ADMIN', 'MEMBER', 'GUEST'),
  }, { underscored: true });
  return UserTeam;
};
