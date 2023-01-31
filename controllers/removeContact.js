const contactsMethods = require("../models/contacts");

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await contactsMethods.removeContact(contactId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  removeContact,
};
