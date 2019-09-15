let { Sequelize, Op } = require("sequelize");
let Model = Sequelize.Model;
let {sequelize} = require("../DB/mysql");

class CarToAmenity extends Model {}

CarToAmenity.init({
  car_id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  amenity_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  sequelize,
  underscored: true,
  tableName: "car_to_amenity"
});

module.exports.CarToAmenity = CarToAmenity;
