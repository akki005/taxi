let { Sequelize, Op } = require("sequelize");
let Model = Sequelize.Model;
let { sequelize } = require("../DB/mysql");

class CarType extends Model { }

CarType.init({
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  amount: {
    type: Sequelize.DECIMAL,
    allowNull: false
  }
}, {
    sequelize,
    underscored: true,
    tableName: "car_type"
  });


CarType.rateByType = async (type) => {
  try {
    let results = await CarType.findOne({
      attributes: ['amount'],
      where: {
        id: type
      }
    })
    return results.length > 0 ? Number(results[0].amount) : 0;
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports.CarType = CarType;
