const sequelize = require("../config/db.config");
const DataType = require("sequelize");
const submateri = require("../models/submateri");

const materi = sequelize.define("materi", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
  },
  judul: {
    type: DataType.STRING,
    allowNull: false,
  },
  deskripsi: {
    type: DataType.TEXT,
    allowNull: false,
  },
  road_id: {
    type: DataType.BIGINT,
    allowNull: true
  }
});

materi.sync()
  .then(() => {
    console.log("materi table created!");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = materi;
