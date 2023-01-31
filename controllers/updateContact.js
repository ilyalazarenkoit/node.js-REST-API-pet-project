const {
  updateContactScheme,
} = require("../helpers/schemas/updateContactSchema");
const contactsMethods = require("../models/contacts");
const { createHttpException } = require("../helpers/createHTTPexeptions");

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const { error } = updateContactScheme.validate({ name, email, phone });
    if (error) {
      throw createHttpException(400, error.message);
    }
    const result = await contactsMethods.updateContact(contactId, {
      name,
      email,
      phone,
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateContact,
};
