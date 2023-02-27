const fs = require("fs-extra");
const jimp = require("jimp");
const path = require("path");
const publicDir = path.join(process.cwd(), "public/avatars");
const { userModel } = require("../../models/user.model");
const changeUserAvatar = async (req, res, next) => {
  try {
    jimp
      .read(req.file.path)
      .then((image) => image.resize(250, 250).write(req.file.path));
    await fs.rename(req.file.path, `${publicDir}/${req.file.originalname}`);
    try {
      const { _id } = req.user;
      await userModel.findByIdAndUpdate(_id, {
        avatarURL: `${publicDir}/${req.file.originalname}`,
      });
      await res.status(200).send(`${publicDir}/${req.file.originalname}`);
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  changeUserAvatar,
};
