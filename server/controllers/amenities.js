let Models = require("../models");
var http_status = require('http-status-codes');
let sequelizeErrorHandler=require("../helpers/sequelizeErrorHandler").handleErrors;

module.exports.controllers = {

    getAll: async (request, response) => {
        try {
            let all_amenities = await Models.Amenity.findAll({
                attributes: ['id', 'type']
            });
            if (all_amenities.length > 0) {
                return response.status(http_status.OK).send(all_amenities);
            } else {
                return response.status(http_status.NOT_FOUND).send();
            }
        } catch (error) {
            console.log(error);
            let sql_error = sequelizeErrorHandler(error)
            if (sql_error) {
                return res.status(sql_error.status).send({
                    error: sql_error.message
                })
            }
            return response.status(http_status.INTERNAL_SERVER_ERROR).send({ error: http_status.getStatusText(http_status.INTERNAL_SERVER_ERROR) })
        }
    }
}