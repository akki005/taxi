let { Sequelize, Op } = require("sequelize");
let Model = Sequelize.Model;
let { sequelize } = require("../DB/mysql");

class RateDistance extends Model { }

RateDistance.init({
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
  }
}, {
    sequelize,
    underscored: true,
    tableName: "rate_distance"
  });

RateDistance.getRateByDistance = async (distance) => {
  try {
    let results = await RateDistance.findAll({
      attributes: ['amount'],
      where: {
        [Op.and]: [{
          start: {
            [Op.lte]: distance
          },
          end: {
            [Op.gte]: distance
          }
        }]
      }
    });
    return results.length > 0 ? Number(results[0].amount) : 0;
  } catch (error) {
    return Promise.reject(error);
  }
}
module.exports.RateDistance = RateDistance;
