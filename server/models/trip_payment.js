let { Sequelize, Op } = require("sequelize");
let Model = Sequelize.Model;
let { sequelize } = require("../DB/mysql");

class TripPayment extends Model { }

TripPayment.init({
    trip_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    transaction_id: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
        sequelize,
        underscored: true,
        tableName: "trip_payment"
    });

module.exports.TripPayment = TripPayment;