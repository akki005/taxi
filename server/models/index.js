
let {
    Driver
} = require("../models/driver");
let {
    Shift
} = require("../models/shift");
let {
    RateDistance
} = require("../models/rate_distance");
let {
    RatePeakHours
} = require("../models/rate_peak_hours");
let {
    Amenity
} = require("../models/amenity");
let {
    CarToAmenity
} = require("../models/car_to_amenity");
let {
    CarType
} = require("../models/car_type");
let {
    Car
} = require("../models/car");
let {
    Trip
} = require("../models/trip");
let {
    TripPayment
} = require("../models/trip_payment");

let { DriverBooking } = require("./driver_bookings");

let { WeekDay } = require("./weekday");

Shift.belongsTo(WeekDay, { foreignKey: 'day' });
WeekDay.hasMany(Shift, { foreignKey: 'day' })
Driver.hasMany(Car, { foreignKey: "driver_id",as:"cars" });
Car.belongsTo(CarType, { foreignKey: "type_id", as: "car_type" });
Car.belongsToMany(Amenity,{through: CarToAmenity, foreignKey: "car_id",as: "amenities"});
Amenity.belongsToMany(Car,{through: CarToAmenity, foreignKey: "amenity_id"});



module.exports = {
    Driver,
    Shift,
    RateDistance,
    RatePeakHours,
    Amenity,
    CarToAmenity,
    CarType,
    Car,
    Trip,
    TripPayment,
    WeekDay,
    DriverBooking
}