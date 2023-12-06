const sequelize = require("../config/db.config");
const DataType = require("sequelize");

const payment = sequelize.define("payment", {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  isPayed: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  date: {
    type: DataType.DATE,
    allowNull: false,
  },
  user_id: {
    type: DataType.INTEGER,
    allowNull: false,
  },
});

payment
  .sync()
  .then(() => {
    console.log("payment table has been created.");
  })
  .catch((error) => {
    console.log(error);
  });

  module.exports = payment;
