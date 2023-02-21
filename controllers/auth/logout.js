const { userModel } = require("../../models/user.model");

const logOut = async (req, res, next) => {
  const { _id } = req.user;
  try {
    await userModel.findByIdAndUpdate(_id, { sessionKey: null });
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  logOut,
};
