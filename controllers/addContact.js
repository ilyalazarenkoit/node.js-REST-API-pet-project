const contactsMethods = require("../models/contacts");
const { createHttpException } = require("../helpers/createHTTPexeptions");
const { addContactScheme } = require("../helpers/schemas/addContactScheme");

const addContact = async (req, res, next) => {
  try {
    const { error } = await addContactScheme.validate(req.body);
    if (error) {
      throw createHttpException(400, error.message);
    }

    const { name, email, phone } = req.body;
    const result = await contactsMethods.addContact({ name, email, phone });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addContact,
};
