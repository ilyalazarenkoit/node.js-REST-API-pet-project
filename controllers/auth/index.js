const { signUp } = require("./sign-up");
const { signIn } = require("./sign-in");
const { logOut } = require("./logout");
const { currentUser } = require("./current");
const { updateStatusUser } = require("./updateStatus");
const { changeUserAvatar } = require("./changeUserAvatar");

module.exports = {
  signUp,
  signIn,
  logOut,
  currentUser,
  updateStatusUser,
  changeUserAvatar,
};
