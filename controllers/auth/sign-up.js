const { userModel } = require("../../models/user.model");
const { createHttpException } = require("../../helpers/createHTTPexeptions");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { sendVerificationMail } = require("../../services/email");
const signUp = async (req, res, next) => {
  const authorizationError = "User is already exists";
  const { email, password } = req.body;
  try {
    const findUser = await userModel.findOne({ email });
    if (findUser) {
      throw createHttpException(401, authorizationError);
    }
    const avatarURL = gravatar.url(email);
    const passwordHash = await bcrypt.hash(password, 10);
    const sessionKey = crypto.randomUUID();
    const emailVerificationToken = nanoid(30);
    await userModel.create({
      email,
      passwordHash,
      sessionKey,
      avatarURL,
      emailVerificationToken,
    });
    await sendVerificationMail(email, emailVerificationToken);

    res.status(200).send("Please verify your email");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
};
