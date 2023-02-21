const express = require("express");
const contactsController = require("../../controllers/contacts");
const router = express.Router();
const { authUser } = require("../../middlewares/auth-user.middleware");

router.get("/", authUser, contactsController.listContacts);

router.get("/:contactId", authUser, contactsController.getContactById);

router.post("/", authUser, contactsController.addContact);

router.delete("/:contactId", authUser, contactsController.removeContact);

router.put("/:contactId", authUser, contactsController.updateContact);

router.patch(
  "/:contactId/favorite",
  authUser,
  contactsController.updateStatusContact
);

module.exports = router;
