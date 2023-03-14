const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  passwordHash: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  sessionKey: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = {
  userModel,
};
