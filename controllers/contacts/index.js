const { addContact } = require("./addContact");
const { listContacts } = require("./listContacts");
const { removeContact } = require("./removeContact");
const { updateContact } = require("./updateContact");
const { getContactById } = require("./getContactById");
const { updateStatusContact } = require("./updateStatusContact");
module.exports = {
  addContact,
  listContacts,
  removeContact,
  updateContact,
  getContactById,
  updateStatusContact,
};
