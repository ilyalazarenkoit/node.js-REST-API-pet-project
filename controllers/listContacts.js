const contactsMethods = require("../models/contacts");

const listContacts = async (req, res, next) => {
  try {
    const result = await contactsMethods.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
};
