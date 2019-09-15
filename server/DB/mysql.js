let Sequelize = require("sequelize");
let app_log = require("debug")("app:log");
let app_error = require("debug")("app:error");
let configs = require("../config/mysql.json");

let sequelize = new Sequelize({
    logging: false,
    dialect: "mysql",
    host: configs.host,
    username: configs.username,
    password: configs.password,
    database: configs.database,
    port: configs.port,
    pool: {
        max: 20,
        idle: 30000
    },
    define: {
        underscored: true,
        freezeTableName: true,
        timestamps: false
    }
})

module.exports = {
    sequelize
};