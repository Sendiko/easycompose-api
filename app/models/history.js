const sequelize = require("../config/db.config");
const DataTypes = require("sequelize");

const history = sequelize.define("history", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  road_id: {
    type: DataTypes.JSON
  },
  materi_id: {
    type: DataTypes.JSON
  },
  video_id: {
    type: DataTypes.JSON
  },
});

history
  .sync()
  .then(() => {
    console.log("history table created successfully");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = history;
