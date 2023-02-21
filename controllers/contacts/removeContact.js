const { ContactModel } = require("../../models/contacts.model");

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await ContactModel.findByIdAndDelete(contactId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  removeContact,
};
