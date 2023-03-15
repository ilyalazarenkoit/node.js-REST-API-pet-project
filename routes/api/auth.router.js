const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth/index");
const { authUser } = require("../../middlewares/auth-user.middleware");
const { validation } = require("../../middlewares/validation.middleware");
const { multerConfig } = require("../../helpers/multer/multer-config");
const multer = require("multer");
const upload = multer({ storage: multerConfig });
const userController = require("../../controllers/user/index");
const {
  reSendEmailValidation,
} = require("../../middlewares/reSendEmailValidation");

module.exports = router;

router.post("/register", validation, authController.signUp);
router.post("/login", validation, authController.signIn);
router.post("/logout", authUser, authController.logOut);
router.post("/current", authUser, authController.currentUser);
router.patch(
  "/avatars",
  authUser,
  upload.single("avatar"),
  authController.changeUserAvatar
);
router.patch("/", authUser, authController.updateStatusUser);
router.get(
  "/email/verify/:emailVerificationToken",
  userController.emailVerification
);
router.post(
  "/email/reverify",
  reSendEmailValidation,
  userController.reSendVerificationMail
);
