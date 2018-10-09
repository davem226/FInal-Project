const router = require("express").Router();
const authController = require("../../controllers/authController");

router.route("/")
    .get(authController.verifyUser)
    .post(authController.addUser);

module.exports = router;