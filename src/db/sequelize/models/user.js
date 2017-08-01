'use strict';
import argon2 from 'argon2'
import { generateSalt } from 'argon2'

module.exports = function(sequelize, DataTypes) {
  const attributes = {
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name',
    },
    lastName:{ type: DataTypes.STRING, field: 'last_name' },
    email:{ type: DataTypes.STRING },
    password: {
      type: DataTypes.STRING,
      validate: {
        isLongEnough: function (val) {
          if(val.length < 16) {
            throw new Error('Password is not long enough. Must be at least 16 characters.')
          }
        },
        isSufficientlyComplex: function (val) {
          var arrayPass = new Array(val)
          let passesSymCheck = arrayPass.some((chr) => {
            return chr.match(/[ !"#\$%&'\(\)\?\*\+\,\-\./\:;\<\=\>?@\[\\\]\^_`\{\|\}~]/)
          })
          let passesNumericCheck = arrayPass.some((chr) => { return chr.match(/\d/) })
          let passesAlphaCheck = arrayPass.some((chr) => { return chr.match(/[a-zA-Z]/)})
          if(!(passesSymCheck && passesNumericCheck && passesAlphaCheck)) { 
            throw new Error('Must have at least 1 of each:  number, letter, and symbol("#$%&\'()*+,-./:;<=>?@[\]^_`{|}~)')
          }
        }
      },
    },
    secQuestion1: {
      type: DataTypes.STRING,
      field: 'sec_question_1'
    },
    secQuestion2: {
      type: DataTypes.STRING,
      field: 'sec_question_2'
    },
    secQuestionResponse1:{ type: DataTypes.STRING, field: 'sec_question_response_1' },
    secQuestionResponse2:{ type: DataTypes.STRING, field: 'sec_question_response_2' },
    token:{ type: DataTypes.STRING },
    activationNonce:{ type: DataTypes.STRING, field: 'activation_nonce' },
    activationExpiry:{ type: DataTypes.DATE, field: 'activation_expiry' },
    signInType:{ type: DataTypes.ENUM('password', 'google'), field: 'sign_in_type' },
    active:{ type: DataTypes.BOOLEAN },
    locked:{ type: DataTypes.BOOLEAN },
    resetToken:{ type: DataTypes.STRING, field: 'reset_token' },
    phoneNumber:{ type: DataTypes.STRING, field: 'phone_number' },
    resetExpiry:{ type: DataTypes.DATE, field: 'reset_expiry' },
    inPasswordReset:{ type: DataTypes.BOOLEAN, field: 'in_password_reset' },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
  }

  const hashPassword = (user, options) => {
    if (!user.changed('password')) { return };
    return argon2.hash(user.password, { type: argon2.argon2i }).then((hash) => {
      user.setDataValue('password', hash)
    })
  }

  const options = {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
    },
    underscored: true,
  }

  var User = sequelize.define('User', attributes, options);
  User.associate = (models) => {
    User.belongsToMany(models.Team, { through: 'UserTeams' })
  }
  return User;
};
