let Models = require("../models");
var http_status = require('http-status-codes');
let sequelizeErrorHandler=require("../helpers/sequelizeErrorHandler").handleErrors;

module.exports.controllers = {
    getAllAmenities: async (request, response) => {
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
    },
    getAllTypes: async (req, response, next) => {
        try {
            let all_types = await Models.CarType.findAll({
                attributes: ['id', 'type']
            });
            if (all_types.length > 0) {
                return response.status(http_status.OK).send(all_types);
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
    },
    addCar: async (req, res, next) => {
        try {
            let results = await Car.findOrCreate({
                where: {
                    id: req.body.id
                }, defaults: req.body
            })
            let status = results[1] === true ? http_status.CONFLICT : http_status.CREATED;
            return res.status(status).send();
        } catch (error) {
            console.log(error);
            let sql_error = sequelizeErrorHandler(error)
            if (sql_error) {
                return res.status(sql_error.status).send({
                    error: sql_error.message
                })
            }
            return res.status(http_status.INTERNAL_SERVER_ERROR)
                .send({
                    error: http_status.getStatusText(http_status.INTERNAL_SERVER_ERROR)
                });
        }
    }
}