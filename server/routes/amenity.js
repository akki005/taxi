var express = require('express');
var router = express.Router();
let { Car } = require("../models/car");
let { controllers } = require("../controllers/amenities");
/* GET users listing. */
router.get('/', controllers.getAll);

module.exports = router;
