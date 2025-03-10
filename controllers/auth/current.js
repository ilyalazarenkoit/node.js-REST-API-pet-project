const currentUser = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.status(200).send({ email, subscription });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  currentUser,
};
