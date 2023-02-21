const { ContactModel } = require("../../models/contacts.model");
const { createHttpException } = require("../../helpers/createHTTPexeptions");

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await ContactModel.findById(contactId);
    res.json(result);
  } catch (error) {
    next(createHttpException(404, "Not found"));
  }
};

module.exports = {
  getContactById,
};
