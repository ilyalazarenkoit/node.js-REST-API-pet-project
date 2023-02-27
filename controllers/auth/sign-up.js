const { userModel } = require("../../models/user.model");
const { createHttpException } = require("../../helpers/createHTTPexeptions");
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../../jwt/index");
const crypto = require("crypto");
const gravatar = require("gravatar");

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
    const createUser = await userModel.create({
      email,
      passwordHash,
      sessionKey,
      avatarURL,
    });

    const accsessToken = createAccessToken({
      userId: createUser._id.toString(),
      sessionKey,
    });
    res.status(200).send(accsessToken);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
};
