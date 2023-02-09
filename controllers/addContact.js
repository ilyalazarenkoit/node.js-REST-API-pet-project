const { ContactModel } = require("../models/contacts.model");
const { createHttpException } = require("../helpers/createHTTPexeptions");
const { addContactScheme } = require("../helpers/schemas/addContactScheme");

const addContact = async (req, res, next) => {
  try {
    const { error } = await addContactScheme.validate(req.body);
    if (error) {
      throw createHttpException(400, error.message);
    }

    const { name, email, phone, favorite } = req.body;
    const result = await ContactModel.create({ name, email, phone, favorite });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addContact,
};
