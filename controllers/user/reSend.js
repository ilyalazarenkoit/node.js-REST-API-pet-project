const { createHttpException } = require("../../helpers/createHTTPexeptions");
const { userModel } = require("../../models/user.model");
const { sendVerificationMail } = require("../../services/email");

const reSendVerificationMail = async (req, res, next) => {
  const errMsg = "Bad request";
  try {
    const { email } = req.body;
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      throw createHttpException(400, errMsg);
    }
    if (findUser.verify) {
      throw createHttpException(400, errMsg);
    }
    await sendVerificationMail(email, findUser.emailVerificationToken);
    res.status(200).json("Please check your email with verification message");
  } catch (error) {
    throw createHttpException(400, errMsg);
  }
};

module.exports = {
  reSendVerificationMail,
};
