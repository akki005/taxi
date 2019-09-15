let Models = require("../models");
let {
    mapService
} = require("../services/googleMaps");
let uuid = require("uuid/v1");
let Sequelize = require("sequelize");
let {
    sequelize
} = require("../DB/mysql");
let QUERIES = require("../constants/mysql");
let moment = require("moment");
var http_status = require('http-status-codes');
let sequelizeErrorHandler = require("../helpers/sequelizeErrorHandler").handleErrors;


module.exports.controllers = {
    book: async (req, res, next) => {
        let transaction;
        try {
            let {
                trip_start_date_time,
                trip_end_date_time,
                trip_start_geo_location,
                trip_end_geo_location,
                trip_start_location,
                trip_end_location,
                trip_amenity_ids,
                trip_car_type_id
            } = req.body;

            let trip_start_date_object = moment(trip_start_date_time);
            let trip_end_date_object = moment(trip_end_date_time);
            let diff_minutes = trip_start_date_object.diff(moment(), 'minutes');

            // check if booking is prior to 120mins
            if (diff_minutes >= 120) {
                const trip_date = trip_start_date_object.format("YYYY-MM-DD");
                const trip_day = trip_start_date_object.day() + 1;
                const trip_start_time = trip_start_date_object.format("HH:mm");
                const trip_end_time = trip_end_date_object.format("HH:mm");

                // calculate the distance based on latitude and longitudes
                let distance_in_meters = await mapService.getDistanceBetweenGeoLocations(trip_start_geo_location, trip_end_geo_location);
                // let distance_in_meters = 50000;
                //limit cab service to 200km range
                if (distance_in_meters / 1000 <= 200) {

                    // start transaction
                    transaction = await sequelize.transaction();

                    let query = trip_amenity_ids.length > 0 ? QUERIES.NEW_QUERY_AMENITIES : QUERIES.NEW_QUERY

                    let query_replacement = {
                        trip_start_date_time: trip_start_date_time,
                        trip_end_date_time: trip_end_date_time,
                        trip_amenity_ids: trip_amenity_ids,
                        trip_car_type_id: trip_car_type_id,
                        trip_day: trip_day,
                        trip_start_time: trip_start_time,
                        trip_end_time: trip_end_time,
                        trip_amenity_count:trip_amenity_ids.length
                    }

                    // execute query to find available driver for given times
                    let results = await sequelize.query(query, {
                        replacements: query_replacement,
                        type: sequelize.QueryTypes.SELECT,
                        transaction: transaction
                    });

                    if (results.length > 0) {

                        let available_driver_details = results[0];

                        // assign the driver to this booking so make him unavailable for other rides for this time slot
                        let book_driver_slot = await Models.DriverBooking.create({
                            date: trip_date,
                            trip_start: trip_start_time,
                            trip_end: trip_end_time,
                            driver_id: available_driver_details.driver_id
                        },
                            transaction
                        )
                        // calculate the trip fare
                        let trip_fare = await calculateFare(distance_in_meters / 1000, trip_amenity_ids, trip_start_time, trip_end_time, trip_car_type_id, trip_day);

                        // create trip entry
                        let created_trip = await Models.Trip.create({
                            from_location: trip_start_location,
                            to_location: trip_end_location,
                            start_time: trip_start_time,
                            end_time: trip_end_time,
                            user_id: uuid(),
                            driver_id: available_driver_details.driver_id,
                            status_id: 1,
                            car_id: available_driver_details.car_id,
                            date: trip_start_date_object.format("YYYY-MM-DD"),
                            distance: distance_in_meters / 1000
                        }, {
                                raw: true,
                                transaction
                            })
                        // marks payment as paid
                        await Models.TripPayment.create({
                            trip_id: created_trip.id,
                            status: "paid",
                            amount: trip_fare,
                            transaction_id: uuid()
                        }, {
                                transaction
                            });

                        await transaction.commit();

                        return res.status(http_status.OK).send({
                            driver_id: available_driver_details.driver_id,
                            driver_name: available_driver_details.driver_name,
                            driver_contact: available_driver_details.driver_contact,
                            car_id: available_driver_details.car_id,
                            trip_fare: trip_fare,
                            trip_status: 1
                        })

                    } else {
                        await transaction.rollback();
                        return res.status(http_status.NOT_FOUND).send({
                            message: "No cabs available "
                        })
                    }
                } else {
                    return res.status(http_status.NOT_FOUND).send({
                        message: "Distance out of range"
                    })
                }

            } else {
                return res.status(http_status.NOT_FOUND).send({
                    message: "Booking only allowed 120 minutes prior"
                })
            }

        } catch (error) {
            console.log(error);
            if (transaction) await transaction.rollback();
            let sql_error = sequelizeErrorHandler(error)
            if (sql_error) {
                return res.status(sql_error.status).send({
                    message: sql_error.message
                })
            }
            return res.status(http_status.INTERNAL_SERVER_ERROR).send({
                message: http_status.getStatusText(http_status.INTERNAL_SERVER_ERROR)
            })
        }
    }
}

async function calculateFare(distance, trip_amenity_ids, start_time, end_time, car_type_id, day_id) {
    try {

        let rates_calculation_tasks = [];
        rates_calculation_tasks.push(Models.RateDistance.getRateByDistance(distance));
        rates_calculation_tasks.push(Models.RatePeakHours.getRateByDepartureDayAndTime(start_time, day_id));
        if (trip_amenity_ids.length > 0) rates_calculation_tasks.push(Models.Amenity.getRateByAmenities(trip_amenity_ids));
        rates_calculation_tasks.push(Models.CarType.rateByType(car_type_id));
        let rates = await Promise.all(rates_calculation_tasks);
        return rates.reduce((acc, cur_val) => acc + cur_val);
    } catch (error) {
        return Promise.reject(error);
    }
}