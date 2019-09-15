let Sequelize = require("sequelize");
let Model = Sequelize.Model;
let { sequelize } = require("../DB/mysql");


class DriverBooking extends Model { }

DriverBooking.init({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    driver_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    trip_start: {
        type: Sequelize.TIME,
        allowNull: false
    },
    trip_end: {
        type: Sequelize.TIME,
        allowNull: false
    }
}, { sequelize, underscored: true, tableName: "driver_booking" });



module.exports.DriverBooking = DriverBooking;