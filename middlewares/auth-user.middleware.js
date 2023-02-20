const { createHttpException } = require("../helpers/createHTTPexeptions");
const jsonwebtoken = require("jsonwebtoken");
const { userModel } = require("../models/user.model");
require("dotenv").config();
const { JWT_SECRET: jwtSecret } = process.env;
const authUser = async (req, res, next) => {
  const notAuthorizedError = "Not authorized";
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw createHttpException(401, notAuthorizedError);
    }

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw createHttpException(401, notAuthorizedError);
    }
    try {
      const { userId, sessionKey } = jsonwebtoken.verify(token, jwtSecret);
      const findUser = await userModel.find({ userId, sessionKey });
      if (!findUser) {
        throw createHttpException(401, notAuthorizedError);
      }

      req.user = findUser;
      next();
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authUser,
};
