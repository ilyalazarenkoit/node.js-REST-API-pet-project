const { ContactModel } = require("../../models/contacts.model");

const listContacts = async (req, res, next) => {
  try {
    if (req.query.limit && req.query.page) {
      const result = await ContactModel.paginate(
        {},
        { page: req.query.page, limit: req.query.limit }
      );
      res.status(200).json(result.docs);
    } else if (req.query.favorite !== undefined) {
      const { favorite } = req.query;
      const result = await ContactModel.find(
        {},
        {
          favorite: favorite,
          name: 1,
          email: 1,
          phone: 1,
          owner: 1,
        }
      );
      res.status(200).json(result);
    } else {
      const result = await ContactModel.find({});
      res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
};
