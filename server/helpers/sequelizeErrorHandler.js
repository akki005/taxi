
var http_status = require('http-status-codes');
let Sequelize = require("sequelize");

module.exports.handleErrors = function (error) {
    if (error instanceof Sequelize.ForeignKeyConstraintError) {
        return {
            message: `${error.value} not found`,
            status: http_status.NOT_FOUND
        }
    }else if(error instanceof Sequelize.UniqueConstraintError){
        return {
            message: `${error.value} already exist`,
            status: http_status.CONFLICT
        }
    }
    else{
        return false;
    };
}