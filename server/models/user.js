let Sequelize = require("sequelize");
let Model = Sequelize.Model;
let {sequelize} = require("../DB/mysql");

class User extends Model { }

User.init({
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
    }
}, { sequelize, underscored: true, tableName: "user" });

module.exports.User = User;