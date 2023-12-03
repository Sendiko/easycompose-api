const sequelize = require("../config/db.config");
const DataType = require("sequelize");
const materi = require("./materi");

const submateri = sequelize.define("submateri", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
  },
  judul: {
    type: DataType.STRING,
    allowNull: false,
  },
  isi: {
    type: DataType.TEXT,
  },
  belongsTo: {
    type: DataType.BIGINT,
    allowNull: false
  }
});

submateri
  .sync()
  .then(() => {
    console.log("submateri table created!");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = submateri;
