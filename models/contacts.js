const fsp = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const { createHttpException } = require("../helpers/createHTTPexeptions");

const updateContactList = async (contacts) =>
  await fsp.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const unparsedContacts = await fsp.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(unparsedContacts);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    throw createHttpException(404, "The contact is not found");
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    throw createHttpException(404, "The contact is not found");
  }
  contacts.splice(index, 1);
  await updateContactList(contacts);
  return contacts[index];
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const contact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(contact);
  await updateContactList(contacts);
  return contact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    throw createHttpException(404, "The contact is not found");
  }
  contacts[index] = { contactId, ...body };
  await updateContactList(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
