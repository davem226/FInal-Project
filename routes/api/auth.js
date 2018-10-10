const router = require("express").Router();
const authController = require("../../controllers/authController");

router.route("/")
    .post(authController.addUser);

router.route("/:username")
    .get(authController.verifyUser);

module.exports = router;