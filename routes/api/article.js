const router = require("express").Router();
const articleController = require("../../controllers/articleController");

router.route("/")
    .post(articleController.saveArticle);

module.exports = router;