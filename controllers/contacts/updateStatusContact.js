const { ContactModel } = require("../../models/contacts.model");
const { createHttpException } = require("../../helpers/createHTTPexeptions");
const {
  updateStatusScheme,
} = require("../../helpers/schemas/updateStatusSheme");

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const { error } = updateStatusScheme.validate({
      contactId,
    });
    if (error) {
      throw createHttpException(404, "Id min.length: 24 symbols");
    }

    if (favorite === undefined) {
      throw createHttpException(400, "missing field favorite");
    }
    await ContactModel.findByIdAndUpdate(contactId, {
      favorite,
    });

    const result = await ContactModel.findById(contactId);
    if (!result) {
      throw createHttpException(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateStatusContact,
};
