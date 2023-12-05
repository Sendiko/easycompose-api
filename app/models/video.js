const sequelize = require("../config/db.config");
const DataType = require("sequelize");

const video = sequelize.define("video", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.BIGINT
  },
  judul: {
    type: DataType.STRING,
    allowNull: false,
  },
  url: {
    type: DataType.TEXT,
    allowNull: false,
  },
  road_id: {
    type: DataType.BIGINT,
    allowNull: true
  }
});

video
  .sync()
  .then(() => {
    console.log("video table created!");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = video;
