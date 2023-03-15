const { userModel } = require("../../models/user.model");
const { createHttpException } = require("../../helpers/createHTTPexeptions");
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../../jwt/index");
const crypto = require("crypto");

const signIn = async (req, res, next) => {
  const authorizationError = "Email or password is wrong";
  const { email, password } = req.body;
  try {
    const findUser = await userModel.findOne({ email });

    if (!findUser) {
      throw createHttpException(401, authorizationError);
    }
    if (!findUser.verify) {
      res.status(401).json(`Please verify your email`);
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
