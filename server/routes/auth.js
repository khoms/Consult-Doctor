const express = require("express");
const {
  register,
  login,
  loginAdmin,
  loginDoctor,
  forgotPassword,
  checkToken,
  resetPassword,
} = require("../controller/auth");

const router = new express.Router();

router.route("/register", register);
router.route("/login").post(login);
router.route("/loginAdmin").post(loginAdmin);
router.route("/loginDoctor").post(loginDoctor);

router.route("/forgotPassword").post(forgotPassword);
router.route("/checkToken").get(checkToken);
router.route("/resetPassword").put(resetPassword);

// console.log('recieved');
module.exports = router;
