const mongoose = require("mongoose");
const { Schema } = mongoose;
const contactShema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  versionKey: false,
});

const ContactModel = mongoose.model("contact", contactShema);

module.exports = {
  ContactModel,
};
