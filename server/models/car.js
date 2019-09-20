let { Sequelize, Op } = require("sequelize");
let Model = Sequelize.Model;
let {sequelize} = require("../DB/mysql");

class Car extends Model {}

Car.init({
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    autoIncrement: false,
    primaryKey: true
  },
  model_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  driver_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  active: {
    type: Sequelize.TINYINT,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  tableName: "car"
});

module.exports.Car = Car;
