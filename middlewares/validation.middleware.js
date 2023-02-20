const { authScheme } = require("../helpers/schemas/auth/authScheme");
const { createHttpException } = require("../helpers/createHTTPexeptions");

const validation = async (req, res, next) => {
  try {
    const { error } = await authScheme.validate(req.body);
    if (error) {
      throw createHttpException(400, "Bad request");
    }
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = {
  validation,
};
