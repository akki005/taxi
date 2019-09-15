let { Sequelize, Op } = require("sequelize");
let Model = Sequelize.Model;
let { sequelize } = require("../DB/mysql");

class RatePeakHours extends Model { }

RatePeakHours.init({
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    autoIncrement: false,
    primaryKey: true
  },
  start: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  end: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  amount: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  day_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
    sequelize,
    underscored: true,
    tableName: "rate_peak_hours"
  });


RatePeakHours.getRateByDepartureDayAndTime = async (start_time, day_id) => {
  try {
    let results = await RatePeakHours.findAll({
      attributes: ['amount'],
      where: {
        [Op.and]: [{
          start: {
            [Op.lte]: start_time
          },
          end: {
            [Op.gte]: start_time
          },
          day_id: {
            [Op.eq]: day_id
          }
        }]
      }
    });
    return results.length > 0 ? Number(results[0].amount) : 0;
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports.RatePeakHours = RatePeakHours;
