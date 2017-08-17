'use strict';
module.exports = function(sequelize, DataTypes) {
  var Team = sequelize.define('Team', {
    name: DataTypes.STRING,
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  }, { underscored: true });

  Team.associate = (models) => {
    Team.belongsToMany(models.User, { through: models.UserTeam })
  }
  return Team;
};
