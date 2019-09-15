let Sequelize = require("sequelize");
let Model = Sequelize.Model;
let { sequelize } = require("../DB/mysql");

class Shift extends Model { }

Shift.init({
  id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    autoIncrement: true,
    primaryKey: true
  },
  driver_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  start: {
    type: Sequelize.TIME,
    allowNull: false
  },
  end: {
    type: Sequelize.TIME,
    allowNull: false
  },
  day: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  available: {
    type: Sequelize.TINYINT,
    allowNull: false,
    defaultValue:true
  }
}, {
    sequelize,
    underscored: true,
    tableName: "shift"
  });

module.exports.Shift = Shift;
