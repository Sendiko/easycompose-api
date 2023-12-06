const sequelize = require("../config/db.config");
const DataTypes = require("sequelize");

const mentoring = sequelize.define("mentoring", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

mentoring
  .sync()
  .then(() => {
    console.log("mentoring table created");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = mentoring;
