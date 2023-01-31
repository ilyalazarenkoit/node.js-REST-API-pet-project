const contactsMethods = require("../models/contacts");

const getContactById = async (req, res, next) => {
  try {
    console.log(req.params);
    const { contactId } = req.params;
    const result = await contactsMethods.getContactById(contactId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContactById,
};
