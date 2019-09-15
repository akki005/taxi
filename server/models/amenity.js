let { Sequelize, Op } = require("sequelize");
let Model = Sequelize.Model;
let { sequelize } = require("../DB/mysql");

class Amenity extends Model { }

Amenity.init({
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    autoIncrement: false,
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
    tableName: "amenity"
  });


Amenity.getRateByAmenities = async (amenities) => {
  try {
    let results = await Amenity.findAll({
      attributes: [[sequelize.fn('SUM', sequelize.col('amount')), 'amount']],
      where: {
        id: {
          [Op.in]: amenities
        }

      }
    })
    return results.length > 0 ? Number(results[0].amount) : 0;
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports.Amenity = Amenity;
