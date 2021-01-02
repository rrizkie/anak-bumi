'use strict';
const {
  Model
} = require('sequelize');
const bycrpt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "please insert username",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "please insert email",
        },
        isEmail: {
          args: true,
          msg: " please insert correct email",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: [6],
          msg: "please insert password min. 6 charachters",
        },
      },
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "please insert your address",
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "please insert phone number",
        },
      },
    },
    role:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user,option)=>{
    user.role = 'customer'

    const salt = bycrpt.genSaltSync(10)
    user.password = bycrpt.hashSync(user.password,salt)
  })
  return User;
};