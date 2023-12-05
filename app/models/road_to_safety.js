const sequelize = require("../config/db.config");
const DataType = require("sequelize");

const roadToSafety = sequelize.define("road_to_safety", {
  id: {
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  judul: {
    type: DataType.STRING,
    allowNull: false,
  },
});

roadToSafety
  .sync()
  .then(() => {
    console.log("road_to_safety table created!");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = roadToSafety;
