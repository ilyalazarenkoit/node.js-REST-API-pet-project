const Joi = require("joi");

const updateContactScheme = Joi.object({
  name: Joi.string().min(2).max(15).required(),

  email: Joi.string().min(2).max(30).required().email(),

  phone: Joi.string().min(5).max(15).required(),

  favorite: Joi.boolean(),
});

module.exports = {
  updateContactScheme,
};
