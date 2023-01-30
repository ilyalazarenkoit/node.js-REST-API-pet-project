const Joi = require("joi");

const addContactScheme = Joi.object({
  name: Joi.string().min(2).max(15).required(),

  email: Joi.string().min(2).max(30).required(),

  phone: Joi.string().min(5).max(15).required(),
});

module.exports = {
  addContactScheme,
};
