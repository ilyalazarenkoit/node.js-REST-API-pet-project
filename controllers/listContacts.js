const { ContactModel } = require("../models/contacts.model");

const listContacts = async (req, res, next) => {
  try {
    const result = await ContactModel.find({});
    console.log(result);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
};
