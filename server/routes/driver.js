var express = require('express');
var router = express.Router();
let Sequelize = require("sequelize");
let { controllers } = require("../controllers/driver");




var http_status = require('http-status-codes');

router.route("/")
    .get(controllers.getAll)
    .post(controllers.add);



router.route("/:id/shifts")
    .post(controllers.addShift)
    .get(controllers.getAllShifts);

router.route("/:id/cars")
    .post(controllers.addCar);


module.exports = router;
