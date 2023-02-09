const {
  updateContactScheme,
} = require("../helpers/schemas/updateContactSchema");
const { ContactModel } = require("../models/contacts.model");
const { createHttpException } = require("../helpers/createHTTPexeptions");

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone, favorite } = req.body;
    const { error } = updateContactScheme.validate({ name, email, phone });
    if (error) {
      throw createHttpException(400, error.message);
    }
    const result = await ContactModel.findByIdAndUpdate(
      contactId,
      {
        name,
        email,
        phone,
        favorite,
      },
      { new: true }
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateContact,
};
