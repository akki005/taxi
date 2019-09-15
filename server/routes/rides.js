var express = require('express');
var router = express.Router();
let { controllers } = require("../controllers/rides");
let {validate} = require("../middlewares/validation");
let Joi = require("joi");

let ride_book_schema = {
    body: Joi.object().keys({
        "trip_amenity_ids": Joi.array().items(Joi.number()).required(),
        "trip_car_type_id": Joi.number().required(),
        "trip_start_date_time": Joi.date().iso().required(),
        "trip_end_date_time": Joi.date().iso().required(),
        "trip_start_location": Joi.string().required(),
        "trip_end_location": Joi.string().required(),
        "trip_start_geo_location": Joi.object().keys({
            "lat": Joi.number().required(),
            "lng": Joi.number().required()
        }),
        "trip_end_geo_location": Joi.object().keys({
            "lat": Joi.number().required(),
            "lng": Joi.number().required()
        })
    })
}
router.post('/book', validate(ride_book_schema), controllers.book);





module.exports = router;
