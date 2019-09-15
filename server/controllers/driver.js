let Models = require("../models");
let Sequelize = require("sequelize");
let {
    sequelize
} = require("../DB/mysql");
var http_status = require('http-status-codes');
let sequelizeErrorHandler = require("../helpers/sequelizeErrorHandler").handleErrors;

module.exports.controllers = {

    getAll: async (req, res, next) => {
        try {
            let all_drivers = await Models.Driver.findAll({
                attributes: ['id', [sequelize.fn('concat', sequelize.col('first_name'), " ", sequelize.col('last_name')), 'name']]
            });
            if (all_drivers.length > 0) {
                return res.status(http_status.OK).send(all_drivers);
            } else {
                return res.status(http_status.NOT_FOUND).send();
            }
        } catch (error) {
            console.log(error);
            let sql_error = sequelizeErrorHandler(error)
            if (sql_error) {
                return res.status(sql_error.status).send({
                    error: sql_error.message
                })
            }
            return res.status(http_status.INTERNAL_SERVER_ERROR).send({ error: http_status.getStatusText(http_status.INTERNAL_SERVER_ERROR) })
        }
    },

    add: async (req, res, next) => {
        try {
            let results = await Models.Driver.findOrCreate({
                where: {
                    id: req.body.id
                }, defaults: req.body
            })
            let status = results[1] === true ? http_status.CREATED : http_status.CONFLICT;
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
    },

    getAllShifts: async (req, res, next) => {
        try {
            let results = await Models.Shift.findAll({
                attributes: ["start", "end", "id"],
                where: {
                    driver_id: Number(req.params.id)
                },
                include: [{
                    model: Models.WeekDay,
                    required: false,
                    as: "WeekDay",
                    attributes: ["day"]
                }]
            })
            return res.status(http_status.OK).send(results);
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
    },

    addShift: async (req, res, next) => {
        try {
            let results = await Models.Shift.findOrCreate({
                where: {
                    driver_id: req.params.id,
                    day: req.body.day
                }, defaults: req.body
            })
            let status = results[1] === false ? http_status.CONFLICT : http_status.CREATED;
            let message = results[1] === false ? "Shift already exist" : "Success";

            return res.status(status).send({
                message: message
            });
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
    },
    addCar: async (req, res, next) => {
        let transaction;
        try {
            transaction = await sequelize.transaction({
                isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
            });
            let results = await Models.Car.findOrCreate({
                where: {
                    id: req.body.id,
                    driver_id: req.params.id
                }, defaults: {
                    id: req.body.id,
                    model_name: req.body.model_name,
                    type_id: req.body.type_id,
                    active: req.body.active,
                    driver_id: req.body.driver_id
                },
                transaction
            })
            if (results[1] !== false) {
                /**
                 * if new record check if there are any amenity to add
                 */
                if (req.body.amenities.length != 0) {

                    for (let amenity of req.body.amenities) {
                        await Models.CarToAmenity.findOrCreate({
                            where: {
                                car_id: req.body.id,
                                amenity_id: amenity
                            },
                            defaults: {
                                car_id: req.body.id,
                                amenity_id: amenity
                            },
                            transaction
                        })
                    }

                }
            }
            await transaction.commit();            
            let status = results[1] === false ? http_status.CONFLICT : http_status.CREATED;
            return res.status(status).send();
        } catch (error) {
            console.log(error);
            if (transaction) await transaction.rollback();
            if (error instanceof Sequelize.ForeignKeyConstraintError) {
                return res.status(http_status.NOT_FOUND).send({
                    message: `${error.value} not found`
                })
            };
            return res.status(http_status.INTERNAL_SERVER_ERROR)
                .send({
                    error: http_status.getStatusText(http_status.INTERNAL_SERVER_ERROR)
                });
        }
    }
}