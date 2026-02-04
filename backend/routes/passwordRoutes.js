const passwordRoutes = require("express").Router();
const {
  sendResetPasswordLinkCtrl,
  getResetPasswordLinkCtrl,
  resetPasswordCtrl,
} = require("../controllers/passwordCtrl");
const verifyrecaptcha = require("../middleware/verifyRecaptcha");


passwordRoutes.post("/reset-password-link",verifyrecaptcha("forgot password"), sendResetPasswordLinkCtrl);


passwordRoutes
  .route("/reset-password/:userId/:token")
  .get(getResetPasswordLinkCtrl)
  .post(resetPasswordCtrl);

module.exports = passwordRoutes;
