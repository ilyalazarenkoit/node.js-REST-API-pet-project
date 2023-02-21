const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth/index");
const { authUser } = require("../../middlewares/auth-user.middleware");
const { validation } = require("../../middlewares/validation.middleware");

module.exports = router;

router.post("/register", validation, authController.signUp);
router.post("/login", validation, authController.signIn);
router.post("/logout", authUser, authController.logOut);
router.post("/current", authUser, authController.currentUser);
router.patch("/", authUser, authController.updateStatusUser);
