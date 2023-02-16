const { userModel } = require("../../models/user.model");

const updateStatusUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { subscription } = req.body;
    await userModel.findByIdAndUpdate(
      _id,
      {
        subscription: subscription,
      },
      { runValidators: true }
    );
    res
      .status(200)
      .send(`Now you have subscription status "${subscription.toUpperCase()}"`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateStatusUser,
};
