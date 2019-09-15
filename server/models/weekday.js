let { Sequelize, Op } = require("sequelize");
let Model = Sequelize.Model;
let { sequelize } = require("../DB/mysql");

class WeekDay extends Model { }

WeekDay.init({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    day: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
        sequelize,
        underscored: true,
        tableName: "weekday"
    });

module.exports.WeekDay=WeekDay;