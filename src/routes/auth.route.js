const router = require("express").Router();
const { asyncHandler } = require("../middlewares/asyncHandler");
const authController = require("../controllers/auth.controller");
// const {
//   signup: signupValidator,
//   signin: signinValidator,
// } = require("../validators/auth");

// router.route("/signin").post(asyncHandler(authController.signin));

// router.route("/logout").post(asyncHandler(authController.logout));

// router.route("/refresh").get(asyncHandler(authController.refresh));

module.exports = router;
