const sequelize = require("../config/db.config");
const DataType = require("sequelize");

const user = sequelize.define("user", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    allowNull: false,
  },
  name: {
    type: DataType.STRING,
    allowNull: false,
  },
  email: {
    type: DataType.STRING,
    allowNull: false,
  },
  password: {
    type: DataType.STRING,
    allowNull: false,
  },
});

user.sync()
  .then(() => {
    console.log("user table created!");
  })
  .catch((error) => {
    console.log(error);
  });

  module.exports = user;
