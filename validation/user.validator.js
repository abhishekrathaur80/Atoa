const Joi = require("joi");

const userVadidaionSchema = Joi.object().keys({
  name: Joi.string().default("").max(30),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  mobileNo: Joi.number().required(),
});

module.exports = { userVadidaionSchema };
