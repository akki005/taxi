let Sequelize = require("sequelize");
let Model = Sequelize.Model;
let {
  sequelize
} = require("../DB/mysql");

class Trip extends Model { }

Trip.init({
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  from_location: {
    type: Sequelize.STRING,
    allowNull: false
  },
  to_location: {
    type: Sequelize.STRING,
    allowNull: false
  },
  start_time: {
    type: Sequelize.TIME,
    allowNull: false
  },
  end_time: {
    type: Sequelize.TIME,
    allowNull: false
  },
  user_id: {
    type: Sequelize.STRING,
    allowNull: false
  },
  driver_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  status_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  car_id: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  distance: {
    type: Sequelize.DECIMAL,
    allowNull: false
  }
}, {
    sequelize,
    underscored: true,
    tableName: "trip"
  });



module.exports.Trip = Trip;
