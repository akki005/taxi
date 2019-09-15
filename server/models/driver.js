let Sequelize = require("sequelize");
let Model = Sequelize.Model;
let { sequelize } = require("../DB/mysql");


class Driver extends Model { }

Driver.init({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    active: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    contact:{
        type: Sequelize.STRING,
        allowNull: false
    }
}, { sequelize, underscored: true, tableName: "driver" });



module.exports.Driver = Driver;