const { DataTypes } = require("sequelize");
const connection = require("../connection");
const validator = require("validator");

const User = connection.define(
  "User",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: "firstName is required.",
        },
        notNull: {
          msg: "firstName is required.",
        },
        len: {
          args: [3, 20],
          msg: "firstName length must be more then 3, less then 20.",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: "lastName is required.",
        },
        notNull: {
          msg: "lastName is required.",
        },
        len: {
          args: [3, 20],
          msg: "lastName length must be more then 3, less then 20.",
        },
      },
    },
    userName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: "userName is required.",
        },
        notNull: {
          msg: "userName is required.",
        },
        len: {
          args: [5, 20],
          msg: "userName length must be more then 5, less then 20.",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: "password is required.",
        },
        notNull: {
          msg: "password is required.",
        },
        is: {
          args: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
          msg: "minimum eight characters, at least one letter and one number.",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: "email is required.",
        },
        notNull: {
          msg: "email is required.",
        },
        isEmail: {
          args: [true],
          msg: "invalid email address.",
        },
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "phone is required.",
        },
        isPhoneNumber(value) {
          if (!validator.isMobilePhone(value, "fa-IR")) {
            throw new Error("invalid phone number.");
          }
        },
      },
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

module.exports = User;
