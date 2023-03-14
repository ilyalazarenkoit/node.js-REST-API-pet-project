const { createHttpException } = require("../../helpers/createHTTPexeptions");
const { userModel } = require("../../models/user.model");
const emailVerification = async (req, res, next) => {
  try {
    const { emailVerificationToken } = req.params;
    const findUser = await userModel.findOne({
      emailVerificationToken,
    });

    if (!findUser) {
      throw createHttpException(404, "Not found");
    }
    await userModel.findByIdAndUpdate(findUser._id, {
      emailVerificationToken: null,
      verify: true,
    });
    res.status(200).send("Verification is successful");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  emailVerification,
};
