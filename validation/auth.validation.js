const Joi = require("joi");

const loginValidationSchema = Joi.object().keys({
  mobileNo: Joi.number().required(),
  password: Joi.string().required(),
});

module.exports = { loginValidationSchema };
