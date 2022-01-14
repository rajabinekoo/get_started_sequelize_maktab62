const { DataTypes } = require("sequelize");
const connection = require("../connection");
const User = require("./user");

const Task = connection.define(
  "Task",
  {
    title: {
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
          msg: "title length must be more then 3, less then 20.",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: {
          args: [5, 1000],
          msg: "description length must be more then 5, less then 1000.",
        },
      },
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate: {
        isIn: {
          args: [[true, false]],
          msg: "isComplete type is boolean.",
        },
      },
    },
  },
  {
    tableName: "tasks",
    timestamps: true,
  }
);

User.hasMany(Task, {
  onDelete: "CASCADE",
});
Task.belongsTo(User);

module.exports = Task;
