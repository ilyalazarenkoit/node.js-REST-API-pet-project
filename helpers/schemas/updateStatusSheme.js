const Joi = require("joi");

const updateStatusScheme = Joi.object({
  contactId: Joi.string().min(24).required(),
});

module.exports = {
  updateStatusScheme,
};
