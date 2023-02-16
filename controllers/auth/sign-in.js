const { userModel } = require("../../models/user.model");
const { createHttpException } = require("../../helpers/createHTTPexeptions");
const { authScheme } = require("../../helpers/schemas/auth/authScheme");
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../../jwt/index");
const crypto = require("crypto");

const signIn = async (req, res, next) => {
  const authorizationError = "Email or password is wrong";
  const { email, password } = req.body;
  try {
    const { error } = await authScheme.validate(req.body);
    if (error) {
      throw createHttpException(400, "Bad request");
    }
    const findUser = await userModel.findOne({ email });

    if (findUser === null) {
      throw createHttpException(401, authorizationError);
    }
    try {
      const isValidPassword = await bcrypt.compare(
        password,
        findUser.passwordHash
      );
      if (!isValidPassword) {
        throw createHttpException(401, authorizationError);
      }
    } catch (error) {
      next(createHttpException(401, authorizationError));
    }

    const sessionKey = crypto.randomUUID();
    await userModel.findByIdAndUpdate(findUser._id, { sessionKey });
    const accsessToken = createAccessToken({
      userId: findUser._id.toString(),
      sessionKey,
    });
    res.status(200).send(accsessToken);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signIn,
};
