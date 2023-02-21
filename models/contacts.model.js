const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePagination = require("mongoose-paginate-v2");
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
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    require: true,
  },
  versionKey: false,
});
contactShema.plugin(mongoosePagination);

const ContactModel = mongoose.model("contact", contactShema);

module.exports = {
  ContactModel,
};
