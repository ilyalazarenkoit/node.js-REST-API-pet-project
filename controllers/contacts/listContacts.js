const { ContactModel } = require("../../models/contacts.model");

const listContacts = async (req, res, next) => {
  try {
    const page = req.query.page || 0;
    const limit = req.query.limit || 20;
    const favorite = req.query.favorite;
    const result = await ContactModel.find({ favorite })
      .skip(page * limit)
      .limit(limit);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
};
