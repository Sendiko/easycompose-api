const sequelize = require("../config/db.config");
const Sequelize = require("sequelize");

const user = sequelize.define("user", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
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
