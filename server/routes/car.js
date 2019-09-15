var express = require('express');
var router = express.Router();
let { Car } = require("../models/car");
let { controllers } = require("../controllers/cars");
let validator=require("../middlewares/validation");
let joi = require("joi");

/* GET users listing. */
router.post('/', controllers.addCar);
router.get('/types', controllers.getAllTypes);
router.get('/amenities', controllers.getAllAmenities);


module.exports = router;
