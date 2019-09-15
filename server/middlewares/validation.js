const Joi = require("joi");


module.exports.validate = function (schema) {
  return function (req, res, next) {

    let results = [];
    let messages = [];

    if (schema.query) {
      results.push(Joi.validate(req.query, schema.query, {
        // convert: false
      }));
    }

    if (schema.body) {
      results.push(Joi.validate(req.body, schema.body, {
        // convert: false
      }));

    }
    if (schema.params) {
      results.push(Joi.validate(req.params, schema.params, {
        // convert: false
      }));
    }

    results.forEach(result => {
      if (result.error) {
        result.error.details.forEach((detail) => {
          messages.push(detail.message);
        });
      }
    });
    console.log(messages);
    if (messages.length != 0) {
      next({
        status: 400,
        message: "Invalid inputs"
      });
    } else {
      next();
    }
  }
}
