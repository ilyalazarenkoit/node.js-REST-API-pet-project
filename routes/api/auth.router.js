const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth/index");
const { authUser } = require("../../middlewares/auth-user.middleware");

module.exports = router;

router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.post("/logout", authUser, authController.logOut);
router.post("/current", authUser, authController.currentUser);
router.patch("/", authUser, authController.updateStatusUser);
